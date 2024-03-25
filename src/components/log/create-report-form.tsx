"use client"
import useZodValidate from '@/hooks/useZodValidate'
import React from 'react'
import { TReportData, TReportSchema} from '../../../lib/auth/zodSchemas'
import { Field } from '@/types/types'
import { Button, Grid, Grid2Props,  TextField } from '@mui/material'
import { useTranslations } from 'next-intl'
import RatingRange from './rating-range'
import BasicDateTimePicker from './time-picker'
import dayjs from 'dayjs'
import { createReport } from '../../../lib/mongo/utils'
import toast from "react-hot-toast"

const fields : (Field<TReportSchema> & Grid2Props & {item?: boolean})[] = [
  {
    name: "sys",
    type: "number",  
    xs: 12,
    md: 4,
    placeholder: "130"    
   
  },
  {
    name: "dia",
    type: "number", 
    xs: 12,
    md: 4,
    placeholder: "80"   
  },
  {
    name: "pulse",
    type: "number", 
    xs: 12,
    md: 4,    
    placeholder: "75"  
  },
  { 
    name: "notes", 
    xs: 12,   
    multiline: true,
    minRows: 2
  },  
];




const CreateLogForm = ({defaultValue}:{defaultValue?: TReportData}) => {  
  
  const t = useTranslations("table");
  const tZod = useTranslations("zod");
  const onSuccess = async (data : TReportData) => {
      const res = await createReport(data);
      if(res.success) {
        toast.success(tZod("reportCreation.success"))
        reset({notes: null,sys: null, dia: null, date: new Date(),rating: null, pulse: null})
        return;
      }
      toast.error(tZod("reportCreation.fail"))
  }
  const {control,formState: {errors},isBusy,submitForm,register,reset,setValue} = useZodValidate({  
    onValidationSuccess: onSuccess, 
    type: "report",   
    defaultValues: {
      date: dayjs((defaultValue && defaultValue.date) && defaultValue.date),
      rating: (defaultValue && defaultValue.rating) ? defaultValue.rating : 3
    }
    
  })

  return (<Grid container component={"form"} onSubmit={submitForm}> 
    <Grid  spacing={2} container>   
    {fields.map(({name,type,xs,md, ...props}) => {
      return <Grid  key={name +"-grid"}  xs={xs} md={md} item>
        <TextField 
        required  
        fullWidth      
        label={t(name)}
        defaultValue={(defaultValue && defaultValue[name]) ? defaultValue[name] : null}
        type={type ?? 'text'}       
        error={errors[name] != undefined}
        helperText={(errors[name] && errors) ? errors[name]!.message as string : "" }       
        InputProps={type == "number" ? {inputProps: {min: 1, max:300}} : undefined}
        key={name} 
        {...props}
        {...register(name)}
      />
      </Grid>
    })}
    <BasicDateTimePicker error={(errors["date"] && errors) ? errors["date"]!.message as string : undefined} control={control}/>
    <RatingRange error={(errors["rating"] && errors) ? errors["rating"]!.message as string : undefined} control={control}/>
    
      <Grid item xs={12}>
          <Button 
            fullWidth
            type='submit' 
            variant='contained' 
            disabled={isBusy}>{isBusy ? t("btn_create.process") : t("btn_create.default")}</Button>
      </Grid>      
    </Grid>      
  </Grid>  
  )
}

export default CreateLogForm