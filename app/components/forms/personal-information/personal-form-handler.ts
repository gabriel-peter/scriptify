'use server'
import { createClient } from '@/utils/supabase/server';
import { TypeOf, z } from 'zod';
import { earliestDob } from '@/app/api/utils/schema-validators';
import { FormSubmissionReturn, Status, asyncFieldValidation, errorHandler } from '@/app/components/forms/validation-helpers';
import { updateOnBoardingStep } from '@/app/get-started/update-onboarding-progress';

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
export type FieldErrors = z.inferFlattenedErrors<typeof formDataSchema>["fieldErrors"];
export async function addPersonalInformation(userId: string, prevState: any, formData: FormData):
    Promise<FormSubmissionReturn<FieldErrors>> {
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
    // TODO Will Catch work regardless of where it is in the chain?
    // If so then we can have those be standard in a class and the rest be custom per form...
    return await asyncFieldValidation(formDataSchema, rawFormData)
        .then((validatedFields) => savePersonalInformation(validatedFields, userId))
        .then(() => updateOnBoardingStep(userId, { personal: true }))
        .then(() => { return { status: Status.SUCCESS }})
        .catch(errorHandler<FieldErrors>)
}

async function savePersonalInformation(validatedFields: z.SafeParseSuccess<TypeOf<typeof formDataSchema>>, userId: string) {
    return await supabase
        .from('profiles').upsert(
            {
                id: userId,
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
        )
        // .eq('id', userId)
        .throwOnError()
}

