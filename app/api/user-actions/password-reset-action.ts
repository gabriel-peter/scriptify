"use server"
import { Status } from "@/components/forms/validation-helpers"
import { Database } from "@/types_db";
import { createClient } from "@/utils/supabase/server"
import { SupabaseClient } from "@supabase/supabase-js";


export async function handleResetPasswordRequest(prevState: any, formData: FormData) {
    const supabase = createClient()

    const newPassword = formData.get("new-password") as string;
    const oldPassword = formData.get("old-password") as string;

    const email = (await supabase.auth.getUser()).data.user?.email;
    if (!email || await checkCurrentPassword(supabase, email, oldPassword)) {
        return {
            status: Status.ERROR,
            message: "Current Password is incorrect."
        }
    }
    if (newPassword === oldPassword) {
        // THROW ERROR
        return {
            status: Status.ERROR,
            message: "Your new password can not be the same as the old password."
        }
    }
    const { data, error } = await supabase.auth.updateUser({
        password: newPassword
    })
    if (error) {
        // TODO
        return {
            status: Status.ERROR,
            message: error.message
        }
    }
    return {
        status: Status.SUCCESS,
        message: "Password Successfully Updated"
    }
}

// TODO
async function checkCurrentPassword(supabase: SupabaseClient<Database>, email: string, password: string) {
    // const { error } = await supabase.auth.signInWithPassword({
    //     email,
    //     password,
    // })
    // return error === null
    return false
}