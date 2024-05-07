"use server";
import { FormSubmissionReturn, Status, asyncFieldValidation, errorHandler } from '@/components/forms/validation-helpers';
import { createClient } from '@/utils/supabase/server';
import { TypeOf, z } from 'zod';

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
export default async function saveMedicalInsuranceForm(userId: string, prevState: any, formData: FormData):
    Promise<FormSubmissionReturn<FieldErrors>> {
    const insuranceFormData = {
        firstName: formData.get("first-name"),
        lastName: formData.get("last-name"),
        insuranceName: formData.get("insurance-name"),
        insuranceId: formData.get("insurance-id"),
        rxGroup: formData.get("rx-group"),
        bin: formData.get("bin"),
        pcn: formData.get("pcn"),
        insuranceNumber: formData.get("insurance-number"),
        ssn: formData.get("ssn")
    }

    return await asyncFieldValidation(insuranceFormSchema, insuranceFormData)
        .then((validatedFields) => saveInsuranceInfromation(validatedFields, userId))
        .then(() => { return { status: Status.SUCCESS } })
        .catch(errorHandler<FieldErrors>)
}

async function saveInsuranceInfromation(validatedFields: z.SafeParseSuccess<TypeOf<typeof insuranceFormSchema>>, userId: string) {
    return await createClient().from("insurance_details").upsert({
        user_id: userId,
        holder_first_name: validatedFields.data.firstName,
        holder_last_name: validatedFields.data.lastName,
        insurance_id: validatedFields.data.insuranceId,
        insurance_num: validatedFields.data.insuranceNumber,
        insurance_name: validatedFields.data.insuranceName,
        rx_group_num: validatedFields.data.rxGroup,
        bin: validatedFields.data.bin,
        pcn: validatedFields.data.pcn,
        ssn: validatedFields.data.ssn,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    }).throwOnError()
}