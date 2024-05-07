"use server"
import { FormSubmissionReturn, PGError, Status, asyncFieldValidation, errorHandler } from '@/components/forms/validation-helpers';
import { createClient } from '@/utils/supabase/server';
import { TypeOf, z } from 'zod';
import { isValidCreditCard, isValidCVV } from '../schema-validators';

// const formDataSchema = z.object({
//     firstName: z.string().min(1),
//     lastName: z.string().min(1),
//     email: z.string().email(),
//     phoneNumber: z.string().min(1),
//     // .regex(/^\+?\d{1,3}\s?\d{3}\s?\d{3}\s?\d{4}$/),
//     streetAddress: z.string().min(1),
//     city: z.string().min(1),
//     region: z.string().min(1),
//     postalCode: z.string().min(1)
//     // .regex(/^\d{5}(?:[-\s]\d{4})?$/),
// });


// Define the schema for credit card information
const creditCardSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    creditCardNumber: z.string().refine(isValidCreditCard, {
        message: 'Invalid credit card number',
    }),
    cvv: z.string().refine(isValidCVV, {
        message: 'Invalid CVV',
    }),
    expiration: z.string().regex(/^\d{2}\/\d{2}$/, {
        message: 'Invalid expiration date. Use format MM/YY',
    }),
});
const supabase = createClient()
export type FieldErrors = z.inferFlattenedErrors<typeof creditCardSchema>["fieldErrors"]
export async function savePatientPaymentInformation(userId: string, prevState: any, formData: FormData):
    Promise<FormSubmissionReturn<FieldErrors>> {
    const rawFormData = {
        firstName: formData.get("first-name"),
        lastName: formData.get("last-name"),
        creditCardNumber: formData.get("card-number"),
        expiration: formData.get("card-expiration-date"),
        cvv: formData.get("card-cvc")
    }

    return await asyncFieldValidation(creditCardSchema, rawFormData)
        .then((validatedFields) => saveCreditCardData(validatedFields, userId))
        .then(() => { return { status: Status.SUCCESS } })
        .catch(errorHandler<FieldErrors>)
}

async function saveCreditCardData(validatedFields: z.SafeParseSuccess<TypeOf<typeof creditCardSchema>>, userId: string) {
    const {error, data}= await supabase.from("payments_details").upsert({
        user_id: userId,
        card_number: validatedFields.data.creditCardNumber,
        cvv: Number(validatedFields.data.cvv),
        expiration: validatedFields.data.expiration,
        holder_first_name: validatedFields.data.firstName,
        holder_last_name: validatedFields.data.lastName,
        updated_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
    })
    if (error) {
        throw new PGError(error);
    }
    return data
}
