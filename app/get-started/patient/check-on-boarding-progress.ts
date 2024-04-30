"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function checkOnBoardingProgress() {
    const supabase = createClient();
    const {
        data: { user }, error
    } = await supabase.auth.getUser()
    // TODO redirect
    if (error || !user) {
        redirect('/login')
    }
    const patientOnBoardingStatus = await supabase
        .from("patient_on_boaring_complete")
        .select("steps")
        .eq("id", user?.id).limit(1).single();
    return patientOnBoardingStatus;
}