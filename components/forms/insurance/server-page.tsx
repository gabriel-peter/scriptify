"use server"

import { createClient } from "@/utils/supabase/server"
import InsuranceInputForm from "./form"
import { useRouter } from "next/navigation"

export default async function Page() {
    const supabase = createClient()
    const router = useRouter()

    const {
        data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
        return <div>NO USER :(</div>
    }
    return <InsuranceInputForm userId={user.id} successAction={() => router.push("/patient/get-started/payment")} />
}