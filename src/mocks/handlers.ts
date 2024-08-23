import dayjs from "dayjs";
import { http, HttpResponse } from "msw";
import realData from "../../public/json/realData.json";
export const handlers = [
    http.post("/api/zod", async ({ request }) => {
        return HttpResponse.json({ success: true }, { status: 200 });
    }),
    http.get("/api/mongo/reports", ({ request }) => {
        const { reports } = realData;
        const url = new URL(request.url);
        const gte = url.searchParams.get("gte");
        const lte = url.searchParams.get("lte");
        const page = Number(url.searchParams.get("page") || "0");
        const pageSize = Number(url.searchParams.get("pageSize") || "30");
        const startIndex = page * pageSize;
        const endIndex = startIndex + pageSize;
        const paginated = reports.slice(startIndex, endIndex);

        if (!lte || !gte) {
            return HttpResponse.json({ reports: paginated, success: true });
        } else {
            const ranged = paginated.filter(
                (obj) =>
                    dayjs(obj.date).isAfter(dayjs(gte)) &&
                    dayjs(obj.date).isBefore(dayjs(lte)),
            );
            return HttpResponse.json(
                { reports: ranged, success: true },
                { status: 200 },
            );
        }
    }),
    http.post("/api/mongo/reports", async ({ request }) => {
        const report = await request.json();
        return HttpResponse.json({ success: true, report }, { status: 200 });
    }),
    http.put("/api/mongo/reports", async ({ request }) => {
        const report = await request.json();

        return HttpResponse.json({ success: true, report }, { status: 200 });
    }),
];
