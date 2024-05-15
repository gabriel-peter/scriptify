import { createClient } from "@/utils/supabase/server"
import { PostgrestResponse } from "@supabase/supabase-js"
import { setTimeout } from "timers/promises"


export async function getTransferedPrescriptions(limit?: number): Promise<PostgrestResponse<any>> {
    const supabase = createClient()

    return await setTimeout(50).then(() => supabase.from("transfer_requests").select(`
    pharmacy_name,
    pharmacy_email,
    pharmacy_phone_number,
    updated_at,
    created_at,
    request_status,
    profiles(
        first_name
    )
    `).limit(limit || 20))

}