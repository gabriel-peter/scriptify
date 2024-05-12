"use server"
import { ACCOUNT_TYPE } from "@/utils/enums";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AccountRestrictedRoute({accountType, children}: {accountType: ACCOUNT_TYPE, children: ReactNode}) {
    const supabase = createClient()
    const {data: {session}} = await supabase.auth.getSession()
    if (!session?.user) {
        redirect("/login")
    }
    if (session?.user.user_metadata['account_type'] as ACCOUNT_TYPE !== accountType) {
        return (<>You do not have access to visit this page.</>)
    }
    return <>{children}</>
}