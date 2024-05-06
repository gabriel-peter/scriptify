"use server"
import { createClient } from "@/utils/supabase/server"
import { getUserDemographicInformation } from "./actions"

export async function getProfilePhotoUrl() {
    const supabase = createClient()
    return await getUserDemographicInformation(['avatar_url'])
}