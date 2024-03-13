import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import repoBase from "../../../public/json/dummyDb.json"
import dayjs from "dayjs"
import { defaultLocale } from "@/middleware"
import 'dayjs/locale/uk';
import 'dayjs/locale/en-gb';
import { GroupByTypes, LogReport } from "@/types/types";
import isEqual from 'lodash/isEqual'; // Import isEqual from lodash
import { groupByProperty } from "../../../lib/utils"
import { property, sortBy } from "lodash"
import ReportTable from "./report-table"
import WeekTable from "./week table/week-table";
import DataGridDemo from "./data-grid";


const formatData = (day: LogReport) => dayjs(day.date).format("Do MMM,ddd")


const checkWeeks = (weeks: LogReport[][]) => {
    weeks.forEach((el) => {
       console.log(formatData(el[0]))
       console.log(formatData(el[el.length - 1]))
       console.log(" ")
       
       
    })
}

const ReportsTable = ({locale = defaultLocale}:{locale?:string}) => {



    

    
    const {reports} = repoBase;
    
    const sorted = sortBy(reports, (report) => dayjs(report.date).unix());
  

    dayjs.locale(locale)
    
    
    
    const headerRows = Object.keys(reports[0])
    const groupsTypes : GroupByTypes = {
        day: {
           property: "year",
           children: {
                property: 'month',
                children: {
                    property: "week",
                    children: {
                        property: "day"
                    }
                }

           }
           
        }
    }
    const currentKey = "day"

    const currDisplay = groupByProperty(sorted, "year");
    const byMonths =  groupByProperty(currDisplay[0], "month");
    const byWeeks =  groupByProperty(byMonths[0], "week");
    const byDays =  groupByProperty(byWeeks[0], "day");
    
   

    
    /*return(<TableContainer>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
            <TableRow>
                <TableCell colSpan={2}>
                    FIlter
                </TableCell>
                <TableCell colSpan={4}>
                    By days
                </TableCell>
            </TableRow>
          <TableRow>
            {headerRows.map((key) =>  
                <TableCell 
                    sx={{textTransform: "capitalize"}} 
                    key={key}
                    >
                    <Typography color={'primary'}  fontWeight={600}>{key}</Typography>
                    </TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
            {reports.map((row) => (
                 <TableRow
                 key={row.date}
                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                {headerRows.map((key) => <TableCell 
                    sx={{textTransform: "capitalize"}}
                     key={key + "row"}>
                        {
                            key == "date" 
                            ? dayjs(row[key as "sys"]).format("D MMMM YYYY H:mm") 
                            : row[key as "sys"]                            
                        }
                </TableCell>
                )}   
                 </TableRow>
            ))}
        </TableBody>
        </Table>
    </TableContainer>) */

    // Current version
//     return(<TableContainer>
//         <TableHead>
//             {/* {currDisplay.header.rows.map((row) => {
//                 if(Array.isArray(row)) {
//                     return <TableRow>
//                         {row.map((row_child) => {
//                             if(typeof row_child == "string") {
//                                 return <TableCell key={row_child}>{row_child}</TableCell>
//                             }
//                             return <TableCell key={typeof row_child == "string" ? row_child : row_child.children} {...row_child}/>
//                         })}
//                     </TableRow>
//                 }
//                 return <TableRow>
//                     {(row.rows.map((row_object) => {
//                          return <TableCell key={row_object}>{row_object}</TableCell>
//                     }))}
//                 </TableRow>
//             })} */}
//         {/* {currDisplay.map((parent_item) => {
//             if(groupsTypes[currentKey].subitems) {
//                 return <></>
//             }
            
//         })} */}
//         {/* groupsTypes */}
//         {currDisplay.map((item) => <ReportTable children={groupsTypes[currentKey]} data={item} property={groupsTypes[currentKey].property} />)}
        
//         </TableHead>
        
//     </TableContainer>)
    // return(<WeekTable items={byDays}/>)
    return (<DataGridDemo items={reports}/>)
 }

export default ReportsTable