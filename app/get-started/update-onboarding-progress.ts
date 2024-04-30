"use server"

import { createClient } from "@/utils/supabase/server"

export async function updateOnBoardingStep(userId: string, step_update: Record<string, boolean>) {
    const supabase = createClient()
    const { error } = await supabase.from("patient_on_boaring_complete").upsert({
        id: userId,
        steps: { ...step_update }
    })
    return error
}