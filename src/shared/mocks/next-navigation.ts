import { vi } from "vitest";

export const useRouterMock = vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
}));

export const useSearchParamsMock = vi.fn(() => ({
    get: vi.fn(),
}));

export const usePathnameMock = vi.fn();

vi.mock("next/navigation", async () => {
    const actual = await vi.importActual("next/navigation");

    return {
        ...actual,
        useRouter: useRouterMock,
        useSearchParams: useSearchParamsMock,
        usePathname: usePathnameMock,
    };
});
