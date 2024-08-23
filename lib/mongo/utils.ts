import { LogReport } from "@/types/types";
import { getTranslations } from "next-intl/server";
import toast from "react-hot-toast";
import {
    TEditUserSchema,
    TReportData,
    TUserLoginData,
    TUserRegisterData,
} from "../auth/zodSchemas";
import { fetchMongoData } from "./actions";

export const checkIfUserExists = async ({ email }: { email: string }) => {
    const res = await fetch(`/api/mongo/users?email=${email}`);
    const data = await res.json();
    if (data.status != 200) return false;
    if (!data.user) return false;

    return true;
};

export const registerUser = async (data: TUserRegisterData) => {
    const res = await fetch(`/api/mongo/users`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json",
        },
    });
    const dataRes = await res.json();
    if (dataRes.status == 500) {
        const t = await getTranslations("zod");
        toast.error(t("userCreation.fail"));
    }
};

export const manageReport = async (
    method: "POST" | "PUT",
    data: TReportData | LogReport,
) => {
    try {
        const dataRes = await fetchMongoData<{ report: LogReport }>(
            `/api/mongo/reports`,
            {
                method,
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json",
                },
            },
        );

        return { success: true, report: dataRes.report };
    } catch (error) {
        return { success: false };
    }
};

export const updateUser = async (data: TEditUserSchema) => {
    try {
        const dataRes = await fetchMongoData<{ success: boolean }>(
            `/api/mongo/users`,
            {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json",
                },
            },
        );

        return { success: true };
    } catch (error) {
        console.log(error);
        return { success: false };
    }
};

export const deleteReport = async (report: LogReport) => {
    try {
        const dataRes = await fetchMongoData<{ report: LogReport }>(
            `/api/mongo/reports`,
            {
                method: "DELETE",
                body: JSON.stringify(report),
                headers: {
                    "Content-type": "application/json",
                },
            },
        );

        return { success: true, report: dataRes.report };
    } catch (error) {
        return { success: false };
    }
};
export type TManageFunc = typeof manageReport;

export const comparePassword = async (loginData: TUserLoginData) => {
    try {
        const res = await fetch(`/api/mongo/users/login`, {
            method: "POST",
            body: JSON.stringify(loginData),
            headers: {
                "Content-type": "application/json",
            },
        });

        if (!res.ok) throw new Error("Req error");

        const { isMatch } = await res.json();
        return isMatch;
    } catch (error) {
        return false;
    }
};
