import { createClient } from "@/utils/supabase/server";

// Get User Demographic Information
export async function getUserDemographicInformation(userId: string) {
    const supabase = createClient();
    return await supabase.from("profiles").select("*").eq("id", userId).single();
}