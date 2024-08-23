import EditUserForm from "@/components/edit user/edit-user-form";
import MetricsDashboard from "@/components/metrics dashboard/metrics-dashboard";
import { getSession } from "@/lib/auth/actions";
import { fetchMongoData } from "@/lib/mongo/actions";
import { MetricsDashboardProps } from "@/types/types";
import { Button, Stack } from "@mui/material";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

const properties = ["email", "name"] as const;

const ProfilePage = async ({
    searchParams: params,
}: {
    searchParams?: { pageMode?: "edit" | "view" };
}) => {
    const data = await fetchMongoData<
        { success: boolean } & MetricsDashboardProps
    >("/api/mongo/users/metrics");

    const session = await getSession();
    const t = await getTranslations("auth");
    const isDisabled = Boolean(
        (params && params.pageMode ? params.pageMode : "view") == "view",
    );
    const { email, name, id } = session;
    const user = {
        email: email!,
        name_first: name?.first!,
        name_last: name?.last!,
        _id: id!,
    };

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
        );
    return (
        <Stack gap={2}>
            <MetricsDashboard {...data} />
            <Button
                sx={{ mt: 4 }}
                LinkComponent={Link}
                href="?pageMode=edit"
                variant="outlined"
            >
                {t("btn_edit.default")}
            </Button>
        </Stack>
    );
};

export default ProfilePage;
