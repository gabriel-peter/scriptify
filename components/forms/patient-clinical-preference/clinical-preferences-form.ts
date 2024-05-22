"use server"

import { updateOnBoardingStep } from "@/app/api/get-started/update-onboarding-progress";
import { chronicConditions, langaugePreferences, meetingPreference, race, sex } from "@/app/api/patient-get-started/options";
import { FormSubmissionReturn, Status, asyncFieldValidation, errorHandler } from "@/components/forms/validation-helpers";
import { createClient } from "@/utils/supabase/server";
import { TypeOf, z } from "zod";

const clinicalInformationSchema = z.object({
    // preferredPharmacistSex: z.nativeEnum(sex),
    langaugePreferences: z.nativeEnum(langaugePreferences),
    meetingPreference: z.nativeEnum(meetingPreference),
    preferredRaceOfPharmacist: z.nativeEnum(race),
    chronicConditions: z.array(z.nativeEnum(chronicConditions))
});

export type FieldErrors = z.inferFlattenedErrors<typeof clinicalInformationSchema>["fieldErrors"]
export default async function savePatientClinicalPreferences(userId: string, prevState: any, formData: FormData)
    : Promise<FormSubmissionReturn<FieldErrors>> {
    console.log(formData);
    const rawFormData = {
        // preferredPharmacistSex: formData.get("language"),
        langaugePreferences: formData.get("language"),
        meetingPreference: formData.get("meeting-environment"),
        preferredRaceOfPharmacist: formData.get("race"),
        chronicConditions: getConditionArray(formData)
    }
    console.log(rawFormData)


    return await asyncFieldValidation(clinicalInformationSchema, rawFormData)
    .then((validatedFields) => dbSaveClinicalPreferences(validatedFields, userId))
    .then(() => updateOnBoardingStep("patient_on_boarding_complete", userId, "clinical_info", true))
    .then(() =>  { return {status: Status.SUCCESS, message: "Succesful Update"}})
    .catch(errorHandler<FieldErrors>)
}

async function dbSaveClinicalPreferences(validatedFields:  z.SafeParseSuccess<TypeOf<typeof clinicalInformationSchema>>, userId: string) {
    const supabase = createClient()
    return await supabase.from("patient_clinical_preferences").upsert({
        chronic_conditions: validatedFields.data.chronicConditions.map(e=>e.toString()),
        allergies: null,
        language: validatedFields.data.langaugePreferences,
        user_id: userId
        
    }).throwOnError();
}

function getConditionArray(formData: FormData) {
    return Object.keys(chronicConditions).map(key => {
        const conditionBool = formData.get("condition-" + key) === "on"
        if (conditionBool) {
            return chronicConditions[key as keyof typeof chronicConditions]
        }
    }).filter(e => e !== undefined);
}
