import { GroupItem, LogReport } from "@/types/types";
import { groupByProperty } from "../../../lib/utils";
import { TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import dayjs, { OpUnitType } from "dayjs";
import Label from "./table-label";





const DateDisplay = ({item: {date},property}:{item: LogReport, property: OpUnitType}) => {
  

    return(<TableCell>
        {
            property === "day"
            ? dayjs(date).format("HH:mm") // 16: 45
            : property === "week"
            ? dayjs(date).format("dddd, D") // Monday, 1
            : property === "month"
            ? dayjs(date).format("dddd D HH:mm")// Modnay 1 16: 45
            : dayjs(date).format("LL HH:mm") // August 16, 2018 16: 45
        }
    </TableCell>)
}


const ReportTable = ({data, children, property}:{data:LogReport[]} & GroupItem) => {
    const grouped = groupByProperty(data, property);
    const keys : (keyof LogReport)[] = ["sys", "dia", "pulse", "rating", "notes"]
   
    
    return(<TableContainer>  
            {children ?
                grouped.map((group,group_index) => <>
                    <TableHead key={property + group_index}>
                            <Label property={property} group={group}/>                        
                    </TableHead> 
                    <TableBody>
                        <ReportTable {...children} data={group}/>
                    </TableBody>
                </>)
            :
                grouped.map((group,group_index) => <>
                    <TableHead key={property + group_index}>
                       <Label property={property} group={group}/>
                       <TableRow >
                            <TableCell  variant="head">Date</TableCell>
                            {keys.map((key) => <TableCell sx={{textTransform: "capitalize"}} key={key}>{key}</TableCell>)}
                       </TableRow>
                    </TableHead>   
                    <TableBody>
                        {group.map((group_item, group_item_index) => 
                        <TableRow sx={{borderColor: "red"}} key={property + group_item_index}>
                            <DateDisplay item={group_item} property={property}/>
                            {keys.map((key) => <TableCell>{group_item[key]}</TableCell>)}
                        </TableRow>)}    
                    </TableBody>                 
                </>)
            }       
    </TableContainer>)
}


export default ReportTable
