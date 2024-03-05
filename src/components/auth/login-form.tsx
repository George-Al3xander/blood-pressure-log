"use client"
import useZodValidate from '@/hooks/useZodValidate'
import React from 'react'
import { TUserLoginData, TUserRegisterData, UserRegisterSchema } from '../../../lib/auth/zodSchemas'
import { Field } from '@/types/types'
import { Button, Grid, Grid2Props, TextField } from '@mui/material'
import { checkIfUserExists, comparePassword } from '../../../lib/mongo/utils'
import toast from 'react-hot-toast'
import { useTranslations } from 'next-intl'
import { sessionLogin } from '../../../lib/auth/actions'
import { SessionData } from '../../../lib/auth/session'
import { useRouter } from 'next/navigation'





const LoginForm = () => {  
  const t = useTranslations('auth');
   const router = useRouter();
  const fields : (Field<TUserRegisterData> & Grid2Props & {item?: boolean})[] = [   
    { 
      name: "email" , 
      xs: 12
    },
    { 
      name: "password",
      type: "password", 
      xs: 12
    },    
  ];
 
  const {formState: {errors},isBusy,submitForm,register, getValues} = useZodValidate({    
    onValidationSuccess: () => router.push("/"), 
    type: "login",  
    additionalCheck: [
        {
            path: ["email", "password"],
            messagePath: "invalidCredentials",
            func: checkIfUserExists
        },
        {
            path: ["email", "password"],
            messagePath: "invalidCredentials",
            func: comparePassword
        }
    ]
  })

  return (<form onSubmit={submitForm}>
    <Grid  spacing={2} container>
    {fields.map(({name,type,xs,md, ...props}) => {
      return <Grid  key={name +"-grid"}  xs={xs} md={md} item>
        <TextField 
        required  
        fullWidth      
        label={t(name)}
        type={type ?? 'text'}
        error={errors[name] != undefined}
        helperText={(errors[name] && errors) ? errors[name]!.message as string : "" }       
        key={name} 
        {...props}
        {...register(name)}
      />
      </Grid>
    })}
    </Grid>      
    <Button type='submit' variant='contained' disabled={isBusy}>{isBusy ? t("btn_login.process") : t("btn_login.default")}</Button>
  </form>
  
  )
}

export default LoginForm