"use client"
import {  ZodSchema } from "zod";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { BodyReq, Schemas, schemas } from "@/app/api/zodValidate/route";
import toast from "react-hot-toast";
import { FormEvent, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { UserRegisterSchema } from "../../lib/auth/zodSchemas";
import { getRegisterSchema } from "../../lib/auth/actions";
import { AdditionalCheckItem, IntlSchema } from "@/types/types";
import { getTranslations } from "next-intl/server";




const useZodValidate = ({
        onValidationSuccess,     
        type,        
        additionalCheck    
    }:{      
        onValidationSuccess: Function,       
        type: Schemas,        
        additionalCheck?: AdditionalCheckItem[]
    }) => {

   
    const [extraCheck, setExtraCheck] = useState(false);
 
    const schema = schemas[type]
    const t = useTranslations("zod")
    
   

    const formReturn = useForm({
        resolver: zodResolver(schema(t))
    });

    const {handleSubmit,setError, getValues, formState: {isSubmitting,errors,isLoading, isValidating}} = formReturn

    const onSubmit = async (data: unknown) => {
        const body: BodyReq = {data, type}
        const res = await fetch("/api/zodValidate", {
            method: "POST",
            body: JSON.stringify(body)
        })      
        if(!res.ok) {
            //toast.error(t("submit.fail"))
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
            let errCount = 0;   
            try {
                for (const { func, path, messagePath } of additionalCheck) {
                    if(typeof path == "string") {                     
                        const val = getValues(path);
                        const res = await func(val);
                        console.log(res)
                        if(!res) {
                            errCount = errCount + 1;
                            setError(path, {
                                type: "server",
                                message: t(`${path}.${messagePath}`)
                            });
                        }
                    } else {
                        const val = getValues(path);
                        const pathMap = path.map((p,index) => [p, val[index]]) as readonly (readonly [unknown, unknown])[]
                        const entries = new Map(pathMap);
                        const obj = Object.fromEntries(entries)
                        
                        const res = await func(obj);
                        
                        if (!res) {
                            errCount = errCount + 1;
                            for(const pathItem of path) {
                                setError(pathItem, {
                                    type: "server",
                                    message: t(messagePath)
                                });
                            }
                        }
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


export type UseZodValidateResult = ReturnType<typeof useZodValidate>

export default useZodValidate