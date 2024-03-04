"use client"
import useZodValidate from '@/hooks/useZodValidate'
import React from 'react'
import { TUserRegisterData, UserRegisterSchema } from '../../../lib/auth/zodSchemas'
import { Field } from '@/types/types'
import { TextField } from '@mui/material'
import { checkIfUserExists } from '../../../lib/mongo/utils'
import toast from 'react-hot-toast'

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

  const fields : Field<TUserRegisterData>[] = [
    { 
      name: "name_first", 
      label: "First name" 
    },
    { 
      name: "name_last", 
      label: "Last name" 
    },
    { 
      name: "email" , 
      label: "Email"
    },
    { 
      name: "password",
      type: "password", 
      label: 'Password' 
    },
    { 
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password" 
    },
  ]
  

 
  const {formState: {errors},isBusy,submitForm,register} = useZodValidate({
    schema: UserRegisterSchema,
    onValidationSuccess: registerUser, 
    type: "register",
    additionalCheck: [{
      path: "email",
      message: "User with this email already exists",
      func: checkIfUserExists
    }]
  })

  return (<form onSubmit={submitForm}>
    {fields.map(({name,type, ...props}) => {
      return <TextField 
        required
        type={type ?? 'text'}
        error={errors[name] != undefined}
        helperText={(errors[name] && errors) ? errors[name]!.message as string : "" }       
        key={name} 
        {...props}
        {...register(name)}
      />
    })}
    <button disabled={isBusy}>Click{isBusy && "ing"}</button>
  </form>
  
  )
}

export default RegisterForm