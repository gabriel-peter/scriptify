"use server"
import { Tables } from "@/types_db";
import { createClient } from "@/utils/supabase/server";
import { PostgrestSingleResponse, User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

// Get User Demographic Information
export async function getUserDemographicInformation<T extends (keyof Tables<"profiles">)>(columnSelect?: T[]):Promise<PostgrestSingleResponse<{[P in T]: any}>> {
    const supabase = createClient()
    const user = await getUserOrRedirect()
    // https://github.com/supabase/supabase-js/issues/551 Type hack -- hopefully resolved soon.
    return await supabase.from("profiles").select(columnSelect ? columnSelect.join(",") as '*': "*").eq("id", user.id).single();
}

export async function getUserOrRedirect(): Promise<User> {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if(!user) {
        redirect('/login')
    }
    return user
}

export async function getUserProfileOrRedirect(): Promise<{user: User, profile: Tables<"profiles">}> {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if(!user) {
        redirect('/login')
    }
    const { error, data} = await getUserDemographicInformation()
    if (error) {
        return redirect("/error")
    }
    return {user, profile: data}
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
