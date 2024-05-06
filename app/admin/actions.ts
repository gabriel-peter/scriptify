"use server"

import { createClient } from "@/utils/supabase/server"

// Filterable by user attribute
// Gets assigned pharmacist
// Etc.
export async function getUsersPaginated(filter?: any, limit?: number) {
    const supabase = createClient()
    // return supabase.from("").select("*, ")
    .
}