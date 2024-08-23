import unset from "lodash/unset";
import { getAccessToken } from "../auth/actions";

export const fetchMongoData = async <T>(
    input: RequestInfo | URL,
    init?: RequestInit | undefined,
): Promise<T> => {
    const { token, success } = await getAccessToken();
    if (!success) throw new Error("Auth error");
    const reqHeaders = init && init.headers && init.headers;

    unset(init, "headers");
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}${input}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            ...reqHeaders,
        },
        ...init,
    });
    if (!res.ok) throw new Error("Req error");
    return await res.json();
};
