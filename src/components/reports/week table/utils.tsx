import { LogReport } from "@/types/types";
import { SxProps, TableCellProps, Typography } from "@mui/material";
import { HTMLAttributes } from "react";

export const cellStyles: SxProps = {border: "1px solid black",textTransform: "capitalize", textAlign: "center",wordWrap: "break-word"}

export const headingStyles: SxProps = {backgroundColor: "gray",fontWeight: 700,...cellStyles}

export const keys : (keyof LogReport)[] = ["date","sys", "dia", "pulse","rating", "notes"];

export const cellTextStyles: SxProps =  {
  fontWeight: 700, 
}


export const reportInfoRows =  (t: (arg: string) => string) : (TableCellProps & HTMLAttributes<HTMLTableHeaderCellElement>)[][] => [
        [
          {
            rowSpan: 2,
            colSpan: 2,
            children: <Typography sx={cellTextStyles}>{t('time')}</Typography>,
          },
          {
            colSpan: 2,
            children: <Typography sx={cellTextStyles}>{t('pressure')}</Typography>,
          },
          {
            rowSpan: 2,
            children: (
              <>
                <Typography sx={cellTextStyles}>{t('pulse')}</Typography>
                <Typography variant="caption" sx={{ opacity: ".7" }}>
                  {t('pulse_addition')}
                </Typography>
              </>
            ),
          },
          {
            rowSpan: 2,
            children: <Typography sx={cellTextStyles}>{t('rating')}</Typography>,
          },
          {
            rowSpan: 2,
            children: <Typography sx={cellTextStyles}>{t('notes')}</Typography>,
          },
        ],
        [
          {
            children: (
              <>
                <Typography sx={cellTextStyles}>{t('sys')}</Typography>
                <Typography variant="caption" sx={{ opacity: ".7" }}>
                  {t('sys_addition')}
                </Typography>
              </>
            ),
          },
          {
            children: (
              <>
                <Typography sx={cellTextStyles}>{t('dia')}</Typography>
                <Typography variant="caption" sx={{ opacity: ".7" }}>
                  {t('dia_addition')}
                </Typography>
              </>
            ),
          },
        ],        
];

