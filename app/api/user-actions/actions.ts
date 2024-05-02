"use server"
import { Tables } from "@/types_db";
import { createClient } from "@/utils/supabase/server";

// Get User Demographic Information
export async function getUserDemographicInformation(userId: string) {
    const supabase = createClient();
    return await supabase.from("profiles").select("*").eq("id", userId).single();
}

export async function getUserPaymentInformation(userId: string) {
    const supabase = createClient();
    const { error, data } = await supabase.from("payments_details").select("*").eq("user_id", userId).limit(1).single();
    if (error) {
        return null
    }
    return data
}

export async function getUserInsuranceInformation(userId: string) {
    const supabase = createClient();
    const { error, data } = await supabase.from("insurance_details").select("*").eq("user_id", userId).limit(1).single();
    if (error) {
        return null
    }
    return data
}

export async function computeAge(date_of_birth: string | null) {
    return date_of_birth ? date_of_birth : "Unknown"
}

export async function stringifyAddress(userInfo: Tables<"profiles">) {
    return userInfo.address1 + " " +
        userInfo.address2 + " " +
        userInfo.city + ", " +
        userInfo.state_enum?.toString() + " " +
        userInfo.zip_code;
}

export async function stringifyName(userInfo: Tables<"profiles">) {
    return userInfo.first_name + " " + userInfo.last_name;
}
