import React from "react"
import { getSession } from "../../../../../lib/auth/actions"
import { Stack, TextField, Button, Typography } from "@mui/material"
import { useTranslations } from "next-intl"
import { getTranslations } from "next-intl/server"
import Link from "next/link"
import EditUserForm from "@/components/edit user/edit-user-form"
import { TEditUserSchema } from "../../../../../lib/auth/zodSchemas"
import { fetchMongoData } from "../../../../../lib/mongo/actions"
import { MetricsDashboardProps, MetricsResponce, MongoUser } from "@/types/types"
import MetricsSidebar from "@/components/metrics dashboard/metrics-sidebar"
import MetricsDashboard from "@/components/metrics dashboard/metrics-dashboard"

const properties = ["email", "name"] as const

const ProfilePage = async ({
  searchParams: params,
}: {
  searchParams?: { pageMode?: "edit" | "view" }
}) => {

  const data = await fetchMongoData<{success: boolean} & MetricsDashboardProps>("/api/mongo/users/metrics")
  
  return <MetricsDashboard {...data}/>
  const session = await getSession()
  const t = await getTranslations("auth")
  const isDisabled = Boolean(
    (params && params.pageMode ? params.pageMode : "view") == "view"
  )
  const { email, name, id } = session
  const user = {
    email: email!,
    name_first: name?.first!,
    name_last: name?.last!,
    _id: id!,
  }

  if (!isDisabled)
    return (
      <>
        <EditUserForm user={user} />
        <Button
          fullWidth
          LinkComponent={Link}
          href="?pageMode=view"
          variant="outlined"
        >
          {t("btn_cancel")}
        </Button>
      </>
    )
  return (
    <Stack gap={2}>
      {properties.map((prop) => {
        const item = session[prop]
        if (!item) return null
        if (typeof item == "string") {
          return (
            <TextField
              disabled={isDisabled}
              key={prop}
              label={t(prop)}
              defaultValue={item}
            />
          )
        }
        const keys = Object.keys(item as Object) as ("last" | "first")[]

        return (
          <>
            {keys.map((key) => (
              <TextField
                disabled={isDisabled}
                key={key}
                label={t(prop + "_" + key)}
                defaultValue={item[key]}
              />
            ))}
          </>
        )
      })}
      <Button
        sx={{ mt: 4 }}
        LinkComponent={Link}
        href="?pageMode=edit"
        variant="outlined"
      >
        {t("btn_edit.default")}
      </Button>
    </Stack>
  )
}

export default ProfilePage
