"use server"
import { FormSubmissionReturn, Status, asyncFieldValidation } from "@/app/actions/validation-helpers";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";


export default async function updateEmail(prevState: any, formData: FormData): Promise<FormSubmissionReturn<any>> {
    return await z.string().email().parseAsync(formData.get('new-email'))
    // .then((value) => {
    //     if (!value) {
    //         return {
    //             status: Status.ERROR,
    //             message: value.error.message,
    //             error: value.error.format()
    //         }
    //     }
    // })
    .then(() => saveEmail(formData.get('new-email')!.toString()))
    .then(() => { return {status: Status.SUCCESS, message: "Email Successfully Updated."}})
    .catch((error: Error) => { // TODO do custom error handling.
        console.log("Additional Error", error)
        return {
            status: Status.ERROR,
            message: error.message
        }
    })
}

async function saveEmail(newEmail: string) {
    const supabase = createClient()
    const { data, error } = await supabase.auth.updateUser({
        email: newEmail
      })
    if (error) {
        console.log(error)
        throw new Error("Error Updating email in System")
    }
    console.log(data);
}