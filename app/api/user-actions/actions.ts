"use server"
import { createClient } from "@/utils/supabase/server";

// Get User Demographic Information
export async function getUserDemographicInformation(userId: string) {
    const supabase = createClient();
    return await supabase.from("profiles").select("*").eq("id", userId).single();
}

export async function getUserPaymentInformation(userId: string) {
    const supabase = createClient();
    return await supabase.from("payments_details").select("*").eq("user_id", userId).limit(1).single().throwOnError();
}