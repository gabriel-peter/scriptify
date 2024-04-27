'use server'

import { redirect } from 'next/navigation'
import { revalidateTag } from 'next/cache'
import { createClient } from '@/utils/supabase/server';
import { z } from 'zod';
import { earliestDob } from '@/app/api/utils/schema-validators';

const currentDate = new Date()
currentDate.setFullYear(currentDate.getFullYear() - 18)
const formDataSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    phoneNumber: z.string().min(1),
    // .regex(/^\+?\d{1,3}\s?\d{3}\s?\d{3}\s?\d{4}$/),
    streetAddress: z.string().min(1),
    city: z.string().min(1),
    region: z.string().min(1),
    postalCode: z.string().min(1),
    dateOfBirth: earliestDob
    // .regex(/^\d{5}(?:[-\s]\d{4})?$/),
});
const supabase = createClient();
export type validatedFieldsType = z.inferFlattenedErrors<typeof formDataSchema>["fieldErrors"];
export async function addPersonalInformation(userId: string, prevState: any, formData: FormData) {
    console.log(userId);
    const rawFormData = {
        firstName: formData.get('first-name'),
        lastName: formData.get('last-name'),
        phoneNumber: formData.get('phone-number'),
        streetAddress: formData.get('street-address'),
        city: formData.get('city'),
        region: formData.get('region'),
        postalCode: formData.get('postal-code'),
        dateOfBirth: formData.get('date-of-birth')
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
        console.log("Fields validated", validatedFields.data);
        // SAVE DATA TO DB
        const error = await savePersonalInformation(validatedFields, userId).then(
            async (error) => {
                if (error)  return { error: "DATABASE ERROR" }
                else {
                    const { error } = await supabase.from("patient_on_boaring_complete").insert({
                        id: userId,
                        steps: {
                            personal: true
                        }
                    }) // TODO needs to be upser
                    return (error)
                }
            } 
        )
        if (error) {
            console.log(error)
            return {
                error: "DATABASE ERROR"
            }
        }
        return {
            message: "SUCCESS"
        }


    }
}

async function savePersonalInformation(validatedFields: z.SafeParseSuccess<typeof formDataSchema>, userId: string) {
    const {error} = await supabase
            .from('profiles').update(
                {
                    first_name: validatedFields.data.firstName,
                    last_name: validatedFields.data.lastName,
                    mailing_address: {
                        street_address: validatedFields.data.streetAddress,
                        city: validatedFields.data.city,
                        region: validatedFields.data.region,
                        postal_code: validatedFields.data.postalCode
                    },
                    date_of_birth: validatedFields.data.dateOfBirth
                }
            ).eq('id', userId)  
            console.log(error)
    return error
}