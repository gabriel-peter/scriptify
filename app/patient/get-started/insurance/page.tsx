"use server"

import InsuranceInputForm from "@/components/forms/insurance/form"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
// import { useRouter } from "next/router"

export default async function Page() {
    const supabase = createClient()
    // const router = useRouter()
    const {
        data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
        return <div>NO USER :(</div>
    }
    return <InsuranceInputForm userId={user.id} redirectUrl={"/patient/get-started/complete"} successAction={undefined} />
}