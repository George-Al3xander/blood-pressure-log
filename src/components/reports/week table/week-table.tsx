import {  Table, TableBody, TableCell,   TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { cellStyles, cellTextStyles, headingStyles, keys, reportInfoRows } from "./utils";
import { useTranslations } from "next-intl";
import {  LogReport } from "@/types/types";
import uniq from 'lodash/uniq';
import map from 'lodash/map';
import dayjs from "dayjs";






const WeekTable = ({items}:{items:LogReport[][]}) => {
    const firstItemDate = items[0][0].date
    const uniqueMonths = uniq(map(items, (group) => dayjs(group[0].date).format("MMMM")));
    
    const YEAR = new Date(firstItemDate).getFullYear();
    const WEEK_START = dayjs(firstItemDate).format("DD.MM");
    const MONTH = uniqueMonths.length == 1 ? uniqueMonths[0] : uniqueMonths.toLocaleString().replaceAll(",", " / ")
    
    const t = useTranslations("table")

    const globalInfoHeaders = [
        `${t('month')}: ${MONTH}`,
        `${t('week')}: ${WEEK_START}`,
        `${t('year')}: ${YEAR}`
    ];
    
    const infoRows = reportInfoRows(t)
 
    return(<TableContainer>
        <Table>
            <TableHead>            
                <TableRow >
                   {globalInfoHeaders.map((info, info_index) =>  <TableCell key={"info-row"+info_index} sx={cellStyles} colSpan={3}>{info}</TableCell>)}
                </TableRow>
                {infoRows.map((row, row_index) => 
                    <TableRow key={"info-row"+row_index}>
                        {row.map((cell) => <TableCell component={"th"} sx={headingStyles} {...cell}/>)}
                    </TableRow>)}
            </TableHead>            
            <TableBody>
                {items.map((group) => <>
                    {group.map((group_item,index) => 
                    <TableRow key={"data-row"+index}>
                        {index == 0 &&  <TableCell sx={{writingMode: "vertical-rl",transform: "rotate(-180deg)", ...headingStyles}} rowSpan={group.length} component={"td"}>
                            <Typography sx={cellTextStyles}>{dayjs(group[0].date).format("dddd")}</Typography>
                            {/* <Typography variant="caption">{dayjs(group[0].date).format("DD.MM")}</Typography> */}
                        </TableCell>}   
                        {keys.map((key) => <TableCell sx={{maxWidth: "50ch",wordWrap: "break-word",...cellStyles}}>{
                            key == "date" ? dayjs(group_item[key]).format("HH:m") : group_item[key]
                        }</TableCell>)}
                    </TableRow>)
                    }
                </>)}   
            </TableBody>
        </Table>
    </TableContainer>)
}

export default WeekTable