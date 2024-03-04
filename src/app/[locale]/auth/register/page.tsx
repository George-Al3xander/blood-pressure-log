import RegisterForm from '@/components/auth/register-form'
import React from 'react'
import {NextIntlClientProvider, useMessages, useTranslations} from 'next-intl';
import { TUserRegisterData, UserRegisterSchema } from '../../../../../lib/auth/zodSchemas';
import { Grid2Props } from '@mui/material';
import { Field } from '@/types/types';
const RegisterPage = () => {
 

 
  return (<div><RegisterForm  /></div>)
}

export default RegisterPage