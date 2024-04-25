"use server";
import { z } from 'zod';

// Define the schema for the insurance form
const insuranceFormSchema = z.object({
    firstName: z.string().max(50),
    lastName: z.string().max(50),
    insuranceName: z.string().min(2).max(50),
    insuranceId: z.string().min(2).max(20),
    rxGroup: z.string().min(2).max(20),
    bin: z.string().min(2).max(20),
    pcn: z.string().min(2).max(20),
    insuranceNumber: z.string().min(2).max(20),
    ssn: z.string().min(9).max(9), // Assuming the SSN is in the format XXX-XX-XXXX
});

export type InsuranceFormValidatedFieldsType = z.inferFlattenedErrors<typeof insuranceFormSchema>["fieldErrors"]
export default async function saveMedicalInsuranceForm(userId: string, prevState: any, formData: FormData) {
    const insuranceFormData = {
        insuranceName: formData.get("insurance-name"),
        insuranceId: formData.get("insurance-id"),
        rxGroup: formData.get("rx-group"),
        bin: formData.get("bin"),
        pcn: formData.get("pcn"),
        insuranceNumber: formData.get("insurance-number"),
        ssn: formData.get("ssn")
    }

    const validationResult = insuranceFormSchema.safeParse(insuranceFormData);

    console.log(userId)
    // Return early if the form data is invalid
    if (!validationResult.success) {
        console.log("Validation Failed.")
        console.log(validationResult.error.flatten().fieldErrors)
        return {
            error: validationResult.error.flatten().fieldErrors,
        }
    } else {
        console.log(validationResult.data);
        // redirect('/get-started/patient/transfer') // Navigate to the new page
        // SAVE DATA TO DB
        // mutate data
        // revalidate cache
        // Advance Page,
        return {
            message: "SUCCESS"
        }

    }
}