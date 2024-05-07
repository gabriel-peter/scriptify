import "server-only"

import { createClient } from "@/utils/supabase/server"
import PatientPersonalInformationForm from "./client-form"
import { redirect } from "next/navigation"

export default async function PersonalInformationFormPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/login")
  }
  return <PatientPersonalInformationForm userId={user?.id} />
}