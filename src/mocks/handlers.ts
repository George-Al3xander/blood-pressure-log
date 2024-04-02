import { BodyReq, schemas } from "@/app/api/zod/route"
import { http, HttpResponse } from "msw"
import { getTranslations } from "next-intl/server"
import realData from "../../public/json/realData.json"
import dayjs from "dayjs"
import isSameOrBefore from "dayjs/plugin/isSameOrBefore"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"
export const handlers = [
  http.post("/api/zod", async ({ request }) => {
    // const t = await getTranslations({ locale: "en", namespace: "zod" })

    // const body = (await request.json()) as BodyReq
    // const schema = schemas[body.type](t)
    // let zodErrs = {}
    // const res = schema.safeParse(body.data)

    // if (!res.success) {
    //   res.error.issues.forEach((issue: { path: string[]; message: string }) => {
    //     zodErrs = { ...zodErrs, [issue.path[0]]: issue.message }
    //   })
    //   return HttpResponse.json({ errors: zodErrs }, { status: 422 })
    // }

    return HttpResponse.json({ success: true }, { status: 200 })
  }),
  http.get("/api/mongo/reports", ({ request }) => {
    const { reports } = realData
    const url = new URL(request.url)
    const gte = url.searchParams.get("gte")
    const lte = url.searchParams.get("lte")
    const page = Number(url.searchParams.get("page") || "0")
    const pageSize = Number(url.searchParams.get("pageSize") || "30")
    const startIndex = page * pageSize
    const endIndex = startIndex + pageSize
    const paginated = reports.slice(startIndex, endIndex)
    //console.log(page, pageSize)
    //console.log(reports.length, "reports")
    // console.log(paginated.length, "paginated")
    if (!lte || !gte) {
      //console.log("no gte or lte provided")
      //console.log("Paginated Reports:", paginated)
      return HttpResponse.json({ reports: paginated, success: true })
    } else {
      //console.log("With Date Range")
      const ranged = paginated.filter(
        (obj) =>
          dayjs(obj.date).isAfter(dayjs(gte)) &&
          dayjs(obj.date).isBefore(dayjs(lte))
      )
      //console.log("Ranged Reports:", ranged)
      return HttpResponse.json({ reports: ranged, success: true })
    }
  }),
]
