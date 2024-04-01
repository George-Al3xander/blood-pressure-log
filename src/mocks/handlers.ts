import { BodyReq, schemas } from "@/app/api/zod/route"
import { http, HttpResponse } from "msw"
import { getTranslations } from "next-intl/server"

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
]
