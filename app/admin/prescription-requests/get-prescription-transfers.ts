"use server"
import { Database } from "@/types_db"
import { createClient } from "@/utils/supabase/server"
import { AsyncReturnType } from "@/utils/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js"




const getAllTransferRequests = async (supabase: SupabaseClient<Database>, queryFilters: QueryFilters) => {

    let query = supabase.from("transfer_requests")
        .select(`
    pharmacy_name,
    pharmacy_email,
    pharmacy_phone_number,
    updated_at,
    created_at,
    request_status,
    profiles(
        first_name,
        last_name
    )
`).range(queryFilters.toIndex, queryFilters.fromIndex)

    if (queryFilters.statusFilter) { query = query.eq("request_status", queryFilters.statusFilter) }
    return query
};


export type AllTransferRequestsResponse = AsyncReturnType<typeof getAllTransferRequests>
export type QueryFilters = {
    // limit?: number, 
    statusFilter?: Database['public']['Enums']['transfer_request_status'],
    toIndex: number,
    fromIndex: number,
}

export async function getTransferedPrescriptions(queryFilters: QueryFilters): Promise<AllTransferRequestsResponse> {
    const supabase = createClient()
    return await getAllTransferRequests(supabase, queryFilters)
}