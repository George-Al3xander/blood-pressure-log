import {
    QueryClient,
    defaultShouldDehydrateQuery,
    isServer,
} from "@tanstack/react-query";

const MAX_AGE_MS = 30 * 1000;

const makeQueryClient = () => {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: MAX_AGE_MS,
            },
            dehydrate: {
                shouldDehydrateQuery: (query) =>
                    defaultShouldDehydrateQuery(query) ||
                    query.state.status === "pending",
            },
        },
    });
};

let browserQueryClient: QueryClient | undefined = undefined;

export const getQueryClient = () => {
    if (isServer) {
        return makeQueryClient();
    } else {
        if (!browserQueryClient) browserQueryClient = makeQueryClient();
        return browserQueryClient;
    }
};

export const queryClient = getQueryClient();
