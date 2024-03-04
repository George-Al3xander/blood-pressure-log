"use client"
import {  ZodSchema } from "zod";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { BodyReq, Schemas } from "@/app/api/zodValidate/route";
import toast from "react-hot-toast";
import { FormEvent, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { UserRegisterSchema } from "../../lib/auth/zodSchemas";
import { getRegisterSchema } from "../../lib/auth/actions";




const useZodValidate = ({
        onValidationSuccess,     
        type,
        additionalCheck
    }:{
        onValidationSuccess: Function,       
        type: Schemas, 
        additionalCheck?: {
            func: (data: string) => Promise<boolean> | boolean, 
            path: string,
            messagePath: string
        }[]
    }) => {

   
    const [extraCheck, setExtraCheck] = useState(false);
    const t = useTranslations("zod")
    const schema = UserRegisterSchema(t)
   
    const formReturn = useForm({
        resolver: zodResolver(schema)
    });

    const {handleSubmit,setError, getValues, formState: {isSubmitting,errors,isLoading, isValidating}} = formReturn

    const onSubmit = async (data: unknown) => {
        const body: BodyReq = {data, type}
        const res = await fetch("/api/zodValidate", {
            method: "POST",
            body: JSON.stringify(body)
        })      
        if(!res.ok) {
            toast.error("Submitting failed")
            return
        }
    
        const resData = await res.json();
        if(resData.errors) {
            const {errors} = resData;         
            const schemaKeys = Object.keys(schema);
                schemaKeys.forEach((key) => {
                if(errors[key]) {
                    setError(key, {
                        type: "server",
                        message: errors[key]
                    })
                }
            })
            return;
        }
  
        if(additionalCheck) {
            setExtraCheck(true);
            let errCount = 0
            try {
                for (const { func, path, messagePath } of additionalCheck) {
                    const val = getValues(path);
                    const res = await func(val);
            
                    if (!res) {
                        errCount = errCount + 1;
            
                        setError(path, {
                            type: "server",
                            message: t(`${path}.${messagePath}`)
                        });
                    }
                }
            } finally {
                setExtraCheck(false);               
            }
            if(errCount > 0) return;
        }       
        await onValidationSuccess(data)
    };
    
    const submitForm = (e: FormEvent<HTMLFormElement>) => handleSubmit(onSubmit)(e);
    
    
    const isBusy = [isSubmitting , isLoading, isValidating ,extraCheck].includes(true);
    
    return {...formReturn,
        extraCheck,
        isBusy, submitForm}
}

export default useZodValidate