"use server"
import { createClient } from "@/utils/supabase/server"


export async function handleResetPasswordRequest() {
    const supabase = createClient()
    const { data, error } = await supabase.auth
    .resetPasswordForEmail('gabepeter0817@gmail.com')
    console.log(data, error)
} 