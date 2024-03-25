"use client"
import { Button, ButtonGroup, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'
const Error = ({
    error,
    reset,
  }: {
    error: Error & { digest?: string }
    reset: () => void
  }) => {
    const router = useRouter()
  return (
    <div>
        <Typography variant='h2'>Error</Typography>
        <Typography variant='h4'>{error.message}</Typography>
        <ButtonGroup>
            <Button variant='contained' onClick={() => router.push("/")}>Home</Button>
            <Button variant='outlined' onClick={reset}>Try again</Button>
        </ButtonGroup>
    </div>
  )
}

export default Error