"use server"

import { createClient } from "@/utils/supabase/server"
import PatientPersonalInformationForm from "./form"

export default async function Page() {
    const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return <div>NO USER :(</div>
  }
  return <PatientPersonalInformationForm userId={user?.id}/>
}