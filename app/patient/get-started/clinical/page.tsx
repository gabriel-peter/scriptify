"use server"

import { getUserOrRedirect } from "@/app/api/user-actions/actions"
import ClinicalPreference from "@/components/forms/patient-clinical-preference/form"

export default async function ClinicalPreferenceFormPage() {
  const user = await getUserOrRedirect()
  return <ClinicalPreference userId={user.id} />
}
