"use server"
import { createClient } from "@/utils/supabase/server";

export async function TestOTP() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOtp({
        email: 'hello@bitbucket.local',
        options: {
            emailRedirectTo: 'https://localhost/request'
        }
    })
    console.log(data, error)
}