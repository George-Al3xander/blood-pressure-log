import { vi } from "vitest";

export const updateMock = vi.fn();
export const getMock = vi.fn();

export const handleSearchParamsMock = vi.fn(() => ({
    get: getMock,
    update: updateMock,
}));

vi.mock("@/shared/lib", async () => {
    const actual = await vi.importActual("@/shared/lib");

    return {
        ...actual,
        useHandleSearchParams: handleSearchParamsMock,
    };
});
