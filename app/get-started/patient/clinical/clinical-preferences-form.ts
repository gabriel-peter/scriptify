"use server"

export default async function savePatientClinicalPreferences(userId: string, prevState: any, formData: FormData) {
    console.log(formData);
    const rawFormData = {
        language: formData.get("language")
    }
    console.log(rawFormData)
    return {
        message: "TODO"
    }
}