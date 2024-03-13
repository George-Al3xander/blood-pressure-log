import { LabelStyling, LogReport } from "@/types/types";
import { TableCell, TableRow, Typography } from "@mui/material";
import dayjs, { OpUnitType } from "dayjs";



const styles: LabelStyling = {
    day: {
    },
    week: {
        sx: {
            textAlign: "center",
        },
        variant: "h6"
    },
    month: {
        sx: {
            textAlign: "center",
        },
        variant: "h5"
    },
    year: {
        
        sx: {
            textAlign: "center",
        } ,
        variant: "h4"      
    }
}



const Label = ({group, property}:{group: LogReport[], property: OpUnitType}) => {
    const firstItemDate = group[0].date;
    const lastItemDate = group[group.length - 1].date;

    return(<TableRow>
        <TableCell  sx={{textTransform: "capitalize", fontWeight: 600}} colSpan={12}>
            <Typography  >
            { 
                property == "day" ? dayjs(firstItemDate).format("dddd, D")
                : property == "week" 
                ? `${dayjs(firstItemDate).format("D")} - ${dayjs(lastItemDate).format("D")}`
                : property == "month" ?  
                dayjs(firstItemDate).format("MMMM")
                : dayjs(firstItemDate).format("YYYY")
            }
            </Typography>
        </TableCell>
   </TableRow>)
}

export default Label