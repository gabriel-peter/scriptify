"use server"
import { createClient } from "@/utils/supabase/server"
import { getUserDemographicInformationCurrentUser, getUserDemographicInformationForUserId } from "./get"

export async function getProfilePhotoUrl(userId?: string) {
    const supabase = createClient()
    if (userId) {
        return await getUserDemographicInformationForUserId(userId, ['avatar_url'])
    }
    return await getUserDemographicInformationCurrentUser(['avatar_url'])
}