"use server"
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AccountRestrictedRoute({accountType, children}: {accountType: string, children: ReactNode}) {
    const supabase = createClient()
    const {data: {user}} = await supabase.auth.getSession()
    if (!user) {
        redirect("/login")
    }
    if (user.user_metadata['account_type'] !== accountType) {
        return (<>You do not have access to visit this page.</>)
    }
    return <>{children}</>
}