"use client"
import useZodValidate from '@/hooks/useZodValidate'
import React from 'react'
import { TUserRegisterData } from '../../../lib/auth/zodSchemas'
import { Field } from '@/types/types'
import { Button, Grid, Grid2Props,  TextField } from '@mui/material'
import { checkIfUserExists, registerUser } from '../../../lib/mongo/utils'
import { useTranslations } from 'next-intl'


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



const RegisterForm = () => {  
  
  const t = useTranslations("auth")


  const {formState: {errors},isBusy,submitForm,register} = useZodValidate({  
    onValidationSuccess: registerUser, 
    type: "register",   
    additionalCheck: [{
      path: "email",
      messagePath: "email.existingUser",
      func: checkIfUserExists
    }]
  })

  return (<Grid item component={"form"} onSubmit={submitForm}>
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
      <Grid item xs={12}>
          <Button 
            fullWidth
            type='submit' 
            variant='contained' 
            disabled={isBusy}>{isBusy ? t("btn_register.process") : t("btn_register.default")}</Button>
      </Grid>      
    </Grid>      
  </Grid>  
  )
}

export default RegisterForm