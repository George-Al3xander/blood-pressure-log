import React from 'react'
import PostAddIcon from '@mui/icons-material/PostAdd';
import { getSession } from '../../../lib/auth/actions';
import { Button } from '@mui/material';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

const  CreateReportLink = async () => {
  const {isLoggedIn}= await getSession()

  if(!isLoggedIn) return null;
  //const t = await getTranslations()

  return (<Button variant='contained' startIcon={<PostAddIcon />} href='/log/create' LinkComponent={Link}>Create</Button>)
}

export default CreateReportLink