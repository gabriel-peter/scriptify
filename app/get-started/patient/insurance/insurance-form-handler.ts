"use server";
import { asyncFieldValidation, errorHandler } from '@/app/components/forms/validation-helpers';
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

export type FieldErrors = z.inferFlattenedErrors<typeof insuranceFormSchema>["fieldErrors"]
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

    return await asyncFieldValidation(insuranceFormSchema, insuranceFormData)
        .catch(errorHandler)
}