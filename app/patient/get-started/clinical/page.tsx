"use server"

import { getUserOrRedirect } from "@/app/actions/user/get"
import ClinicalPreference from "@/components/forms/patient-clinical-preference/form"

export default async function ClinicalPreferenceFormPage() {
  const user = await getUserOrRedirect()
  return <ClinicalPreference userId={user.id} />
}
