import { cn } from "@/shared/lib";
import { FC, HTMLAttributes, PropsWithChildren, ReactNode } from "react";

type Props = PropsWithChildren<{
    header: ReactNode;
    headerProps?: {
        wrapper?: HTMLAttributes<HTMLDivElement>;
        content?: HTMLAttributes<HTMLDivElement>;
    };
    mainProps?: HTMLAttributes<HTMLElement>;
}>;

const baseStyles = "w-[min(90%,50rem)] mx-auto py-4";

export const Layout: FC<Props> = ({
    header,
    children,
    headerProps,
    mainProps,
}) => (
    <div className="flex min-h-screen flex-col gap-4">
        <header
            {...headerProps?.wrapper}
            className={cn(
                "sticky top-0 z-30 w-full bg-blue-600 text-white",
                headerProps?.wrapper?.className,
            )}
        >
            <div
                {...headerProps?.content}
                className={cn(baseStyles, headerProps?.content?.className)}
            >
                {header}
            </div>
        </header>
        <main
            {...mainProps}
            className={cn(baseStyles, "flex-1 py-10", mainProps?.className)}
        >
            {children}
        </main>
    </div>
);
