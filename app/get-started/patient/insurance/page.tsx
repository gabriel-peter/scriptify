"use server"

import InsuranceInputPage from "@/app/components/forms/insurance/form"
import { createClient } from "@/utils/supabase/server"

export default async function Page() {
    const supabase = createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
        return <div>NO USER :(</div>
    }
    return <InsuranceInputPage userId={user.id} />
}