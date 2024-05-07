import "server-only"

import { createClient } from "@/utils/supabase/server"
import PersonalInformationForm from "./client-form"
import { redirect } from "next/navigation"
import { Route } from "next"

export default async function PersonalInformationFormPage({successRedirectUrl}: {successRedirectUrl: Route<string>}) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/login")
  }
  return <PersonalInformationForm userId={user?.id} successRedirectUrl={successRedirectUrl} />
}