'use server'

import { redirect } from 'next/navigation'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

const formDataSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    phoneNumber: z.string(),
    // .regex(/^\+?\d{1,3}\s?\d{3}\s?\d{3}\s?\d{4}$/),
    streetAddress: z.string().min(1),
    city: z.string().min(1),
    region: z.string().min(1),
    postalCode: z.string()
    // .regex(/^\d{5}(?:[-\s]\d{4})?$/),
});
export type validatedFieldsType = z.inferFlattenedErrors<typeof formDataSchema>["fieldErrors"]
export async function addPersonalInformation(userId: string, prevState: any, formData: FormData) {
    const rawFormData = {
        firstName: formData.get('first-name'),
        lastName: formData.get('last-name'),
        email: formData.get('email'),
        phoneNumber: formData.get('phone-number'),
        streetAddress: formData.get('street-address'),
        city: formData.get('city'),
        region: formData.get('region'),
        postalCode: formData.get('postal-code')
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
        // mutate data
        // revalidate cache
        // Advance Page,
        return {
            message: "SUCCESS"
        }

    }
}