import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        NODE_ENV: z.enum(["development", "test", "production"]),
        MONGO_URI: z.string(),
    },
    client: {
        NEXT_PUBLIC_BASE_URL: z.string().url(),
    },
    runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,
        NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
        MONGO_URI: process.env.MONGO_URI,
    },
});
