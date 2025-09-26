import { getMock, paginationTestingApi, updateMock } from "@/shared/mocks";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("PaginationControls", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("should render with given page and count", () => {
        const PAGE_COUNT = 5;
        const CURRENT_PAGE = 3;

        paginationTestingApi.renderPagination({
            count: PAGE_COUNT,
            page: CURRENT_PAGE,
        });

        Array.from({ length: PAGE_COUNT }).forEach((__, i) => {
            const num = i + 1;

            expect(
                paginationTestingApi.getPaginationButton(
                    num,
                    CURRENT_PAGE === num,
                ),
            ).toBeInTheDocument();
        });
        ["next", "previous"].forEach((k) =>
            expect(
                paginationTestingApi.getPaginationButton(k as "next"),
            ).toBeInTheDocument(),
        );
    });

    it("should call update if page differs from search param", () => {
        const PAGE_COUNT = 5;
        const CURRENT_PAGE = 3;

        paginationTestingApi.renderPagination({
            count: PAGE_COUNT,
            page: CURRENT_PAGE,
        });

        expect(updateMock).toHaveBeenCalledWith("page", CURRENT_PAGE);
    });

    it("should not call update if page equals search param", () => {
        const PAGE_COUNT = 5;
        const CURRENT_PAGE = 3;

        getMock.mockReturnValueOnce(CURRENT_PAGE.toString());

        paginationTestingApi.renderPagination({
            count: PAGE_COUNT,
            page: CURRENT_PAGE,
        });

        expect(updateMock).not.toHaveBeenCalledWith();
    });

    it("should call update on page change", async () => {
        const PAGE_COUNT = 5;
        const CURRENT_PAGE = 3;
        const PAGE_TO_CLICK = 2;

        getMock.mockReturnValueOnce(CURRENT_PAGE.toString());

        paginationTestingApi.renderPagination({
            count: PAGE_COUNT,
            page: CURRENT_PAGE,
        });

        await userEvent.click(
            paginationTestingApi.getPaginationButton(PAGE_TO_CLICK),
        );

        expect(updateMock).toHaveBeenCalledWith(
            "page",
            PAGE_TO_CLICK.toString(),
        );
    });
});
