"use server"

import { FormSubmissionReturn, Status } from "@/app/components/forms/validation-helpers";

export default async function savePatientClinicalPreferences(userId: string, prevState: any, formData: FormData)
:Promise<FormSubmissionReturn<null>> {
    console.log(formData);
    const rawFormData = {
        language: formData.get("language")
    }
    console.log(rawFormData)
    return {
        status: Status.ERROR,
        message: "TODO"
    }
}