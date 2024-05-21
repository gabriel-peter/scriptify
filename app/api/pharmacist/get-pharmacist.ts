"use server"

import { Status } from "@/components/forms/validation-helpers";
import { Database } from "@/types_db";
import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";


function getPharmacistByUserId(client: SupabaseClient<Database>) {
    return client.from("users").select(`*,
    profiles!inner(*),
    pharmacist_to_patient_match!pharmacist_to_patient_match_pharmacist_id_fkey(
        users!pharmacist_to_patient_match_patient_id_fkey(
            *,
            profiles!inner(*)
        )
        )
    `);
}


export async function selfGetPharmacist() {
    const supabase = createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (!user) {
        console.error(error);
        return { status: Status.ERROR }
    }
    return await getPharmacistByUserId(createClient()).eq("id", user.id).single();
}