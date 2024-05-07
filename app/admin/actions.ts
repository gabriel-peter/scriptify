"use server"

import { createClient } from "@/utils/supabase/server"

// Filterable by user attribute
// Gets assigned pharmacist
// Etc.
export async function getUsersPaginated(filter?: any, limit?: number) {
    const supabase = createClient()
    const {error, data} = await supabase.from("user_profiles").select("*").limit(limit || 20)
    console.log(data)
    return {error, data}
}