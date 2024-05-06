"use server"

import { createClient } from "@/utils/supabase/server"

export async function updateOnBoardingStep(userId: string, key: string, value: boolean) {
    const supabase = createClient()
    const { error } = await supabase.from("patient_on_boaring_complete").upsert({
        user_id: userId,
        [key]: value
    })
    return error
}