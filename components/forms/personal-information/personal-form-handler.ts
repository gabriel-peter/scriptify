'use server'
import { createClient } from '@/utils/supabase/server';
import { TypeOf, z } from 'zod';
import { earliestDob } from '@/app/actions/schema-validators';
import { FormSubmissionReturn, Status, asyncFieldValidation, errorHandler } from '@/app/actions/validation-helpers';
import { updateOnBoardingStep } from '@/app/actions/on-boarding/update-onboarding-progress';
import { Tables } from '@/types_db';
import { sex } from '@/app/actions/options';
import { ACCOUNT_TYPE } from '@/utils/enums';

const formDataSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    phoneNumber: z.string().min(1),
    sex: z.nativeEnum(sex),
    // .regex(/^\+?\d{1,3}\s?\d{3}\s?\d{3}\s?\d{4}$/),
    streetAddress: z.string().min(1),
    streetAddress2: z.optional(z.string()),
    city: z.string().min(1),
    state: z.string().min(2),
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
        streetAddress2: formData.get('street-address-2'),
        sex: formData.get("sex"),
        city: formData.get('city'),
        state: formData.get('state'),
        postalCode: formData.get('postal-code'),
        dateOfBirth: formData.get('date-of-birth')
    }
    // TODO Will Catch work regardless of where it is in the chain?
    // If so then we can have those be standard in a class and the rest be custom per form...
    return await asyncFieldValidation(formDataSchema, rawFormData)
        .then((validatedFields) => savePersonalInformation(validatedFields, userId))
        .then(async () => { 
            const {data: {user}, error} = await supabase.auth.getUser()
            if (!user) {
                console.error(error);
                throw new Error("Unable to get user.");
            }
            if (user.user_metadata['account_type'] as ACCOUNT_TYPE === ACCOUNT_TYPE.PATIENT) {
                return "patient_on_boarding_complete"
            }
            if (user.user_metadata['account_type'] as ACCOUNT_TYPE === ACCOUNT_TYPE.PHARMACIST) {
                return "pharmacist_on_boarding_complete"
            } else {
                throw new Error("Unable to get user.");
            }
        })
        .then((onBoardingTable) => updateOnBoardingStep(onBoardingTable, userId, 'personal_info', true))
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
                sex: validatedFields.data.sex,
                address1: validatedFields.data.streetAddress,
                address2: validatedFields.data.streetAddress2,
                city: validatedFields.data.city,
                state_enum: validatedFields.data.state as Tables<"profiles">['state_enum'],
                zip_code: validatedFields.data.postalCode,
                date_of_birth: validatedFields.data.dateOfBirth,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
        ).throwOnError()
}

