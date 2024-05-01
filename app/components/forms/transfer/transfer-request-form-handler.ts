import "server-only"
import { sendTransferRequestEmail } from '@/utils/email/email-handlers';
import { createClient } from '@/utils/supabase/server';
import { TypeOf, z } from 'zod'
import { FormSubmissionReturn, Status, asyncFieldValidation, errorHandler } from '@/app/components/forms/validation-helpers';
import { updateOnBoardingStep } from '@/app/get-started/update-onboarding-progress';

const formDataSchema = z.object({
    pharmacyName: z.string().min(1),
    email: z.string().email(),
    phoneNumber: z.string().min(1),
    // .regex(/^\+?\d{1,3}\s?\d{3}\s?\d{3}\s?\d{4}$/),
    streetAddress: z.string().min(1),
    city: z.string().min(1),
    region: z.string().min(1),
    postalCode: z.string().min(1),
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
        streetAddress: formData.get('street-address'),
        city: formData.get('city'),
        region: formData.get('region'),
        postalCode: formData.get('postal-code'),
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
        // .then(() => updateOnBoardingStep(userId, { transfer: true }))
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
        pharmacy_phone_number: validatedFields.data.phoneNumber,
        mailing_address: {
            street_address: validatedFields.data.streetAddress,
            city: validatedFields.data.city,
            state: validatedFields.data.region,
            postal_code: validatedFields.data.postalCode
        }
    }).select().single().throwOnError();

    return {
        validatedFields,
        result
    }
}