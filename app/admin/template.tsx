"use server"

import { ReactNode } from "react";
import AccountRestrictedRoute from "@/components/auth/account-restricted-page";

export default async function AdminRootTemplate({children}: {children: ReactNode}) {
    return (
        // <AccountRestrictedRoute accountType="Admin">
        <>
            {children}
            </>
        // </AccountRestrictedRoute>
    )
}