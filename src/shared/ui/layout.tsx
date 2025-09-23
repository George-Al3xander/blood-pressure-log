import { FC, PropsWithChildren, ReactNode } from "react";
import {
    AppBar,
    type AppBarProps,
    Box,
    Container,
    type ContainerProps,
} from "./index";

type Props = PropsWithChildren<{
    header: ReactNode;
    headerProps?: {
        wrapper?: AppBarProps;
        content?: ContainerProps;
    };
    mainProps?: ContainerProps;
}>;

const BREAK_POINT = "lg";

export const Layout: FC<Props> = ({
    header,
    children,
    headerProps,
    mainProps,
}) => (
    <Box minHeight="100vh" display="flex" flexDirection="column" gap={4}>
        <AppBar
            position="sticky"
            sx={{
                backgroundColor: "primary.main",
                color: "primary.contrastText",
                zIndex: 30,
                ...headerProps?.wrapper?.sx,
            }}
            {...headerProps?.wrapper}
        >
            <Container
                maxWidth={BREAK_POINT}
                sx={{
                    py: 1,
                    display: "flex",
                    gap: 4,
                    alignItems: "center",
                    justifyContent: "space-between",
                    ...headerProps?.content?.sx,
                }}
                {...headerProps?.content}
            >
                {header}
            </Container>
        </AppBar>

        <Container
            component="main"
            flex={1}
            sx={{ pb: 4 }}
            mx="auto"
            maxWidth={BREAK_POINT}
            {...mainProps}
        >
            {children}
        </Container>
    </Box>
);
