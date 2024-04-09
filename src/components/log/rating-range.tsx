import Slider from '@mui/material/Slider';
import { Box, Grid } from '@mui/material';
import { useTranslations } from 'next-intl';
import { Control, Controller } from 'react-hook-form';
import { CustomInput } from '@/types/types';
import { MockHelperText } from '../utils/mock-helper-text';





export default function RatingRange({control,defaultValue,error}:CustomInput) {
    const t = useTranslations('table')
    const marks  = [
        { value: 5, label:  t("rating_range.5")},
        { value: 4, label:  t("rating_range.4")},
        { value: 3, label:  t("rating_range.3")},
        { value: 2, label:  t("rating_range.2")},
        { value: 1, label:  t("rating_range.1")}
    ];
  return (
    <Grid alignSelf={"center"}  item xs={12}>
        <Box mx={"auto"} width={"90%"}>
            <Controller 
            name={"rating"}
            control={control}
            render={({field: {onChange}}) => (
              <Slider             
                aria-label="Rating marks"
                defaultValue={defaultValue ? +defaultValue : 3}
                onChange={({target: {value}}: {target: any})=> onChange(value)} 
                             
                step={1}
                min={1}
                max={5}
                valueLabelFormat={(v) => t(`rating_range.${v}`)}
                valueLabelDisplay="auto"
                marks={marks}
              />
            )}
            />
        </Box>
        <MockHelperText text={error}/>     
    </Grid>
  );
}