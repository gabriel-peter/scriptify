"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function checkPatientOnBoardingProgress() {
    const supabase = createClient();
    const {
        data: { user }, error
    } = await supabase.auth.getUser()
    // TODO redirect
    if (error || !user) {
        redirect('/login')
    }
    const patientOnBoardingStatus = await supabase
        .from("patient_on_boarding_complete")
        .select("*")
        .eq("user_id", user?.id).limit(1).single();
    return patientOnBoardingStatus;
}

export async function checkPharmacistOnBoardingProgress() {
    const supabase = createClient();
    const {
        data: { user }, error
    } = await supabase.auth.getUser()
    // TODO redirect
    if (error || !user) {
        redirect('/login')
    }
    const patientOnBoardingStatus = await supabase
        .from("pharmacist_on_boarding_complete")
        .select("*")
        .eq("user_id", user?.id).limit(1).single();
    return patientOnBoardingStatus;
}