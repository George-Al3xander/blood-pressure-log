import type { AppBarProps, BoxProps, ContainerProps } from "@mui/material";
import { AppBar, Box, Container } from "@mui/material";
import { FC, PropsWithChildren, ReactNode } from "react";

type Props = PropsWithChildren<{
    header: ReactNode;
    headerProps?: {
        wrapper?: AppBarProps;
        content?: ContainerProps;
    };
    mainProps?: BoxProps;
}>;

export const Layout: FC<Props> = ({
    header,
    children,
    headerProps,
    mainProps,
}) => (
    <Box minHeight="100vh" display="flex" flexDirection="column" gap={2}>
        <AppBar
            position="sticky"
            sx={{
                backgroundColor: "primary.main",
                color: "primary.contrastText",
                zIndex: 30,
                p: 2,
                ...headerProps?.wrapper?.sx,
            }}
            {...headerProps?.wrapper}
        >
            <Container
                maxWidth="md"
                sx={{
                    py: 1,
                    display: "flex",
                    gap: 4,
                    justifyItems: "center",
                    justifyContent: "space-between",
                    ...headerProps?.content?.sx,
                }}
                {...headerProps?.content}
            >
                {header}
            </Container>
        </AppBar>

        <Box
            component="main"
            flex={1}
            py={5}
            mx="auto"
            maxWidth="md"
            {...mainProps}
        >
            {children}
        </Box>
    </Box>
);
