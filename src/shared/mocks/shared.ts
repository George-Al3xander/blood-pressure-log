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

vi.mock("@t3-oss/env-nextjs", async () => {
    const actual = await vi.importActual("@t3-oss/env-nextjs");

    return {
        ...actual,
        createEnv: vi.fn(({ runtimeEnv }) =>
            Object.keys(runtimeEnv).map((key) => [key, "string"]),
        ),
    };
});
