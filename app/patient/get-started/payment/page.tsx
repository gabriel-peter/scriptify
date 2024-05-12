"use server"

import PaymentForm from "@/components/forms/payment/form"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function Page() {
  const supabase = createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
        return <div>NO USER :(</div>
    }
  return <PaymentForm userId={user.id} redirectUrl="/patient/my-dashboard"/>
}


