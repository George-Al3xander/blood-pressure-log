import { PaginationControls } from "@/shared/ui";
import { screen } from "@testing-library/react";
import { IntlMessageFormat } from "intl-messageformat";
import { ComponentProps } from "react";
import messages from "../../../messages/en.json";
import { renderWithNextIntl } from "./render-with-next-intl";

type PaginationTestingApi = {
    renderPagination: (
        props: ComponentProps<typeof PaginationControls>,
    ) => void;
    getPaginationButton: (
        page: "next" | "previous" | "first" | "last" | number,
        selected?: boolean,
    ) => HTMLElement;
};

export const paginationTestingApi: PaginationTestingApi = {
    renderPagination: (props) => {
        renderWithNextIntl(<PaginationControls {...props} />);
    },
    getPaginationButton: (page, selected = false) => {
        let query: string | RegExp;

        if (typeof page === "number") {
            query = String(
                new IntlMessageFormat(messages.pagination.page).format({
                    page: page,
                    selected: Number(selected),
                }),
            );
        } else {
            query = messages.pagination[page];
        }

        return screen.getByLabelText(query);
    },
};
