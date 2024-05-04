"use server"
import { Status } from "@/app/components/forms/validation-helpers"
import { Database } from "@/types_db";
import { createClient } from "@/utils/supabase/server"
import { SupabaseClient } from "@supabase/supabase-js";


export async function handleResetPasswordRequest({ newPassword, oldPassword }: { newPassword: string, oldPassword: string }) {
    const supabase = createClient()
    // More secure option?
    // const { data, error } = await supabase.auth
    // .resetPasswordForEmail('gabepeter0817@gmail.com')
    // console.log(data, error)
    // TODO confirm old password is legit
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