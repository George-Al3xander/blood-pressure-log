import MenuIcon from "@mui/icons-material/Menu";
import {
    AppBar,
    Box,
    IconButton,
    Link,
    Toolbar,
    Typography,
} from "@mui/material";
import { AuthClientWrapper } from "./auth-client-wrapper";
import LanguageSelect from "./language-select";
import SettingsMenu from "./settings-menu";

export default function Header({ locale }: { locale: string }) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar component={"header"} position="fixed">
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography
                            color={"white"}
                            variant="h6"
                            href="/log"
                            component={Link}
                        >
                            Blood Pressure Log
                        </Typography>
                    </Box>
                    <AuthClientWrapper
                        Component={SettingsMenu}
                        fallback={
                            <IconButton disabled>
                                <MenuIcon />
                            </IconButton>
                        }
                    />
                    <LanguageSelect locale={locale} />
                </Toolbar>
            </AppBar>
        </Box>
    );
}
