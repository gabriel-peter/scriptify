import "server-only"

import PersonalInformationFormPage from "@/components/forms/personal-information/server-page"

export default async function Page() {
  return <PersonalInformationFormPage successRedirectUrl="/patient/get-started/transfer"/>
}