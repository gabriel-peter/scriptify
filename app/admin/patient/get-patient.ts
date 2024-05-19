import { Database } from "@/types_db";
import { createClient } from "@/utils/supabase/server";
import { AsyncReturnType } from "@/utils/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";


async function getPatientById(supabase: SupabaseClient<Database>, userId: string) {
    return await supabase.from('users').select(`
        *,
        profiles!inner(*),
        transfer_requests!inner(*),
        pharmacist_to_patient_match!pharmacist_to_patient_match_patient_id_fkey(*)
    `).eq("id", userId).single();
}

export type GetPatientByIdResponse = AsyncReturnType<typeof getPatientById>

export async function getPatientProfile(userId: string) {
    const supabase = createClient();
    return await getPatientById(supabase, userId)
}