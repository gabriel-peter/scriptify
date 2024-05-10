"use server"
import { sendTransferRequestEmail } from '@/utils/email/email-handlers';
import { createClient } from '@/utils/supabase/server';
import { TypeOf, z } from 'zod'
import { FormSubmissionReturn, Status, asyncFieldValidation, errorHandler } from '@/components/forms/validation-helpers';
import { updateOnBoardingStep } from '@/app/api/get-started/update-onboarding-progress';

const formDataSchema = z.object({
    pharmacyName: z.string().min(1),
    email: z.string().email(),
    phoneNumber: z.string().min(1),
    // .regex(/^\+?\d{1,3}\s?\d{3}\s?\d{3}\s?\d{4}$/),
    emailBody: z.string().max(250),
    emailSubject: z.string().max(50)
    // .regex(/^\d{5}(?:[-\s]\d{4})?$/),
});

const supabase = createClient(); // TODO research side-effects of in file-scope
export type FieldErrors = z.inferFlattenedErrors<typeof formDataSchema>["fieldErrors"]
export async function transferPrescription(userId: string, prevState: any, formData: FormData):
    Promise<FormSubmissionReturn<FieldErrors>> {
    const rawFormData = {
        pharmacyName: formData.get('pharmacy-name'),
        email: formData.get('email'),
        phoneNumber: formData.get('phone-number'),
        emailBody: formData.get("email-body"),
        emailSubject: formData.get("email-heading")
    }

    return await asyncFieldValidation(formDataSchema, rawFormData)
        .then((validatedFields) => insertTransferRequest(validatedFields, userId))
        .then(({ result, validatedFields }) => {
            if (result.data === null) { throw Error("Result Returned Null") }
            else { return { data: result.data, validatedFields } }
        })
        .then(({ data, validatedFields }) => sendTransferRequestEmail([validatedFields.data.email],
            `${'localhost:3000'}/transfer-request/${data.id}`, // TODO
            validatedFields.data.emailBody
        ))
        .then(() => updateOnBoardingStep(userId, "transfer_info", true ))
        .then(() => { return { status: Status.SUCCESS } })
        .catch(errorHandler<FieldErrors>)
}

async function insertTransferRequest(validatedFields: z.SafeParseSuccess<TypeOf<typeof formDataSchema>>, userId: string) {
    const result = await supabase.from("transfer_requests").insert({
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        pharmacy_name: validatedFields.data.pharmacyName,
        pharmacy_email: validatedFields.data.email,
        user_id: userId,
        pharmacy_phone_number: validatedFields.data.phoneNumber
    }).select().single().throwOnError();

    return {
        validatedFields,
        result
    }
}