"use client"
import useZodValidate from '@/hooks/useZodValidate'
import React from 'react'
import { TUserRegisterData, UserRegisterSchema } from '../../../lib/auth/zodSchemas'
import { Field } from '@/types/types'
import { Button, Grid, Grid2Props, TextField } from '@mui/material'
import { checkIfUserExists } from '../../../lib/mongo/utils'
import toast from 'react-hot-toast'
import { useTranslations } from 'next-intl'


const registerUser = async (data: TUserRegisterData) => {
  const res =  await fetch(`/api/mongo/users`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json"
    }
  }) 
  const dataRes = await res.json()
  if(dataRes.status == 500) {
    toast.error("Failed creating user")
  }
     
} 

const RegisterForm = () => {  
  const t = useTranslations('auth');

  const fields : (Field<TUserRegisterData> & Grid2Props & {item?: boolean})[] = [
    { 
      name: "name_first", 
      xs: 12,
      md: 6,
    },
    { 
      name: "name_last", 
      xs: 12,
      md: 6,
    },
    { 
      name: "email" , 
      xs: 12
    },
    { 
      name: "password",
      type: "password", 
      xs: 12
    },
    { 
      name: "confirmPassword",
      type: "password",      
      xs: 12
    },
  ];
 
  const {formState: {errors},isBusy,submitForm,register} = useZodValidate({    
    onValidationSuccess: registerUser, 
    type: "register",
    additionalCheck: [{
      path: "email",
      messagePath: "existingUser",
      func: checkIfUserExists
    }]
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
    <Button type='submit' variant='contained' disabled={isBusy}>{isBusy ? t("btn_process") : t("btn")}</Button>
  </form>
  
  )
}

export default RegisterForm