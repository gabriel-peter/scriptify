"use server"

import AccountRestrictedRoute from "@/components/auth/account-restricted-page";
import { ACCOUNT_TYPE } from "@/utils/enums";
import { ReactNode } from "react";


export default async function Layout({children}:{children: ReactNode}) {
    return (
        <AccountRestrictedRoute accountType={ACCOUNT_TYPE.PATIENT}>
            {children}
        </AccountRestrictedRoute>
    )
}