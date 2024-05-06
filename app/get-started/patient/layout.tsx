"use server"

import AccountRestrictedRoute from "@/app/components/auth/account-restricted-page";
import { ReactNode } from "react";


export default async function Layout({children}:{children: ReactNode}) {
    return (
        <AccountRestrictedRoute accountType="Patient">
            {children}
        </AccountRestrictedRoute>
    )
}