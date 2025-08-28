import {
    FC,
    HTMLAttributes,
    PropsWithChildren,
    ReactNode,
    type CSSProperties,
} from "react";

type Props = PropsWithChildren<{
    header: ReactNode;
    headerProps?: {
        wrapper?: HTMLAttributes<HTMLDivElement>;
        content?: HTMLAttributes<HTMLDivElement>;
    };
    mainProps?: HTMLAttributes<HTMLElement>;
}>;

const layoutContainerStyle: CSSProperties = {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
    gap: "1rem",
};

const stickyHeaderStyle: CSSProperties = {
    position: "sticky",
    top: 0,
    zIndex: 30,
    width: "100%",
    backgroundColor: "#2563EB",
    color: "#ffffff",
};

const baseContentStyle: CSSProperties = {
    width: "min(90%, 50rem)",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: "1rem",
    paddingBottom: "1rem",
};

const mainStyle: CSSProperties = {
    ...baseContentStyle,
    flex: 1,
    paddingTop: "2.5rem",
    paddingBottom: "2.5rem",
};

export const Layout: FC<Props> = ({
    header,
    children,
    headerProps,
    mainProps,
}) => (
    <div style={layoutContainerStyle}>
        <header
            {...headerProps?.wrapper}
            style={{
                ...stickyHeaderStyle,
                ...headerProps?.wrapper?.style,
            }}
        >
            <div
                {...headerProps?.content}
                style={{
                    ...baseContentStyle,
                    ...headerProps?.content?.style,
                }}
            >
                {header}
            </div>
        </header>
        <main
            {...mainProps}
            style={{
                ...mainStyle,
                ...mainProps?.style,
            }}
        >
            {children}
        </main>
    </div>
);
