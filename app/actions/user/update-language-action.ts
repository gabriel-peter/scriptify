"use server"
import { FormSubmissionReturn, Status, asyncFieldValidation } from "@/app/actions/validation-helpers";
import { createClient } from "@/utils/supabase/server";
import { TypeOf, z } from "zod";
import { langaugePreferences } from "../options";

// export type FieldErrors = z.inferFlattenedErrors<typeof nameSchema>["fieldErrors"]
export default async function updateLanguage(prevState: any, formData: FormData):
Promise<FormSubmissionReturn<null>> {
    return await z.nativeEnum(langaugePreferences).parseAsync(formData.get("language"))
    // .then((validatedFields) => saveNewName(validatedFields, userId))
    .then(() => { return { status: Status.SUCCESS, message: "Succesful Update" }})
    // .catch(error => {
    //     console.log(error)
    //     return {
    //         status: Status.ERROR,
    //         message: error
    //     }
    // })
}

// async function saveNewName(validatedFields: z.SafeParseSuccess<TypeOf<typeof nameSchema>>, userId: string) {
//     const supabase = createClient()
//     const {data, error } = await supabase.from("profiles").update(
//         {
//             first_name: validatedFields.data.firstName,
//             last_name: validatedFields.data.lastName
//         }
//     ).eq("id", userId).throwOnError();
//     return {data, error}
// }