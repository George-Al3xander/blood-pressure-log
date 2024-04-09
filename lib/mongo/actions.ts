//"use server"
//import { headers } from "next/headers"
import { getAccessToken } from "../auth/actions"
//import { login } from "../auth/actions"
import unset from "lodash/unset"

export const fetchMongoData = async <T>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
): Promise<T> => {
  const { token, success } = await getAccessToken()
  if (!success) throw new Error("Auth error")
  const reqHeaders = init && init.headers && init.headers

  unset(init, "headers")
  //unset(headers, "Authorization")

  //const host = headers().get("host")
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}${input}`, {
    headers: {
     Authorization: `Bearer ${token}`,
      ...reqHeaders,
    },
    ...init,
  })
  if (!res.ok) throw new Error("Req error")
  const data = await res.json()
  return data
}
