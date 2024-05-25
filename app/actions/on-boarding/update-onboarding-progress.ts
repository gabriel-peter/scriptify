// import "server-only"
"use server"
import { createClient } from "@/utils/supabase/server"
import { SupabaseClient } from "@supabase/supabase-js"

export async function updateOnBoardingStep(
    table: "patient_on_boarding_complete" | "pharmacist_on_boarding_complete", 
    userId: string,
     key: string, 
     value: boolean, 
     supabase?: SupabaseClient
    ) {
    if (!supabase) { supabase = createClient() }
    const { error } = await supabase.from(table).upsert({
        user_id: userId,
        [key]: value
    })
    return error
}