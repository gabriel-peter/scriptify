import "server-only"

import PersonalInformationForm from "./client-form"
import { Route } from "next"
import { getUserOrRedirect } from "@/app/actions/user/get"

export default async function PersonalInformationFormPage({successRedirectUrl}: {successRedirectUrl: Route<string>}) {
  const user = await getUserOrRedirect()
  return <PersonalInformationForm userId={user.id} successRedirectUrl={successRedirectUrl} />
}