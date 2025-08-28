import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
    turbopack: {
        resolveAlias: { "@/*": "./src/*" },
    },
};

const withNextIntl = createNextIntlPlugin("./src/shared/i18n/request.ts");
export default withNextIntl(nextConfig);
