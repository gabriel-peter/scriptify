'use server'
import PersonalInformationFormPage from "@/components/forms/personal-information/server-page"

export default async function PharmacistPersonalInformationPage() {
  return <PersonalInformationFormPage successRedirectUrl="/pharmacist/get-started/license"/>
}