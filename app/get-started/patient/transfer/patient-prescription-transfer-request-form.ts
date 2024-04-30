"use server"
import { sendTransferRequestEmail } from '@/utils/email/email-handlers';
import { createClient } from '@/utils/supabase/server';
import { TypeOf, ZodType, z } from 'zod'
import { updateOnBoardingStep } from '../../update-onboarding-progress';

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
export type FieldErrors = z.inferFlattenedErrors<typeof formDataSchema>["fieldErrors"]
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

    return await asyncFieldValidation(formDataSchema, rawFormData)
        .then((validatedFields) => insertTransferRequest(validatedFields, userId))
        .then(({ result, validatedFields }) => {
            if (result.data === null) { throw Error("Result Returned Null") }
            else { return { data: result.data, validatedFields } }
        })
        .then(({ data, validatedFields }) => sendTransferRequestEmail([validatedFields.data.email],
            `${process.env['HOST']}/transfer-request/${data.id}`,
            validatedFields.data.emailBody
        ))
        .then(() => updateOnBoardingStep(userId, { transfer: true }))
        .then(() => { return { message: "Success" } })
        .catch((error) => {
            console.error("Error occurred:", error)
            if (error instanceof ValidationParseError) {
                return {
                    error: error.getFieldErrors()
                }
            }
            return {
                error: "Unknown Error Occurred"
            }
        })
}

class ValidationParseError<T extends ZodType<any, any, any>> extends Error {
    errors
    constructor(msg: string, errors: z.inferFlattenedErrors<T>["fieldErrors"]) {
        super(msg);
        this.errors = errors;
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ValidationParseError.prototype);
    }

    getFieldErrors() {
        return this.errors
    }
}

async function asyncFieldValidation<U extends ZodType<any, any, any>>(formDataSchema: z.ZodObject<TypeOf<U>>, rawFormData: any): Promise<z.SafeParseSuccess<TypeOf<U>>> {
    const validatedFields = formDataSchema.safeParse(rawFormData)
    // Throw early if the form data is invalid
    if (!validatedFields.success) {
        console.debug("Validation Failed for ", typeof formDataSchema)
        console.log(validatedFields.error.flatten().fieldErrors)
        throw new ValidationParseError("Validation Failed.", validatedFields.error.flatten().fieldErrors)
    }
    return validatedFields
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