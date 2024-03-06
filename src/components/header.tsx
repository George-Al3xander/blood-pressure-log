import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import LanguageSelect from "./language-select"



export default function Header ({locale}: {locale: string}) {



    return(<Box sx={{ flexGrow: 1 }}>
        <AppBar  component={"header"} position="fixed">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Blood Pressure Log
                </Typography>       
                <LanguageSelect locale={locale}/>     
            </Toolbar>  
        </AppBar>
    </Box>)
}
