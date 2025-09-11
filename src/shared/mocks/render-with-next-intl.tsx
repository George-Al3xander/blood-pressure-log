import { render } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import messages from "../../../messages/en.json";

export const renderWithNextIntl = (children: ReactNode) => {
    render(
        <NextIntlClientProvider locale="en" messages={messages}>
            {children}
        </NextIntlClientProvider>,
    );
};
