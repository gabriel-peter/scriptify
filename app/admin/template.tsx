"use server"

import { ReactNode } from "react";
import AccountRestrictedRoute from "@/components/auth/account-restricted-page";
import { ACCOUNT_TYPE } from "@/utils/enums";

export default async function AdminRootTemplate({children}: {children: ReactNode}) {
    return (
        <AccountRestrictedRoute accountType={ACCOUNT_TYPE.ADMIN}>
            {children}
        </AccountRestrictedRoute>
    )
}