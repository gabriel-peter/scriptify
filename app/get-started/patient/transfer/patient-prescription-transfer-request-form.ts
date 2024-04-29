"use server"
import { sendTransferRequestEmail } from '@/utils/email/email-handlers';
import { createClient } from '@/utils/supabase/server';
import { z } from 'zod'

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

const supabase = createClient();
export type validatedFieldsType = z.inferFlattenedErrors<typeof formDataSchema>["fieldErrors"]
export async function transferPrescription(userId: string, prevState: any, formData: FormData) {
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
    const validatedFields = formDataSchema.safeParse(rawFormData)
    console.log(userId)
    // Return early if the form data is invalid
    if (!validatedFields.success) {
        console.log("Validation Failed.")
        console.log(validatedFields.error.flatten().fieldErrors)
        return {
            error: validatedFields.error.flatten().fieldErrors,
        }
    } else {
        console.log(validatedFields.data);
        // redirect('/get-started/patient/transfer') // Navigate to the new page
        // SAVE DATA TO DB
        return await insertTransferRequest(validatedFields, userId)
            .then(({ data }) => {
                if (data === null) { throw Error("Result Returned Null") }
                else { return data }
            })
            .then((data) => sendTransferRequestEmail([validatedFields.data.email],
                `${process.env['HOST']}/transfer-request/${data.id}`,
                validatedFields.data.emailBody
            ))
            .then(() => { return { message: "Success" }})
            .catch((error) => {
                console.error("Error occurred:", error)
                return {
                    error: "Error occurred"
                }
            })

    }
}

async function insertTransferRequest(validatedFields: any, userId: string) {
    return supabase.from("transfer_requests").insert({
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
}