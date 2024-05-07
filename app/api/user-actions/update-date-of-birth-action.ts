"use server"
import { FormSubmissionReturn, Status } from "@/components/forms/validation-helpers";
import { Database } from "@/types_db";
import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { getUserOrRedirect } from "./actions";
import { earliestDob } from "@/components/forms/schema-validators";


export default async function updateDateOfBirth(prevState: any, formData: FormData): Promise<FormSubmissionReturn<any>> {
    const supabase = createClient()
    const user = await getUserOrRedirect()
    return await earliestDob.parseAsync(formData.get('date-of-birth'))
        .then(() => saveDateOfBirth(supabase, formData.get('date-of-birth')!.toString(), user.id))
        .then(() => { return { status: Status.SUCCESS, message: "Date of Birth Successfully Updated." } })
        .catch((error: Error) => { // TODO do custom error handling.
            console.log("Additional Error", error)
            return {
                status: Status.ERROR,
                message: error.message
            }
        })
}

async function saveDateOfBirth(supabase: SupabaseClient<Database>, dateOfBirth: string, userId: string) {
    const { data, error } = await supabase.from("profiles").update({
        date_of_birth: dateOfBirth
    }).eq("id", userId)
    if (error) {
        console.log(error)
        throw new Error("Error updating date of birth.")
    }
    console.log(data);
}