import "server-only"

import { createClient } from "@/utils/supabase/server"
import ClientForm from "./form"
import { ReactNode } from "react"

export default async function ServerFormPage({children}: {children: ReactNode}) {
    const supabase = createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
        return <div>NO USER :(</div>
    }
    return <ClientForm>{children}</ClientForm>
}