"use server"
import { Database } from "@/types_db"
import { createClient } from "@/utils/supabase/server"
import { AsyncReturnType, PaginationFilters } from "@/utils/supabase/types";
import { da } from "@faker-js/faker";
import { SupabaseClient } from "@supabase/supabase-js"




const getAllTransferRequests = async (supabase: SupabaseClient<Database>, queryFilters: GetTransferedRequestsFilters) => {

    let query = supabase.from("transfer_requests")
        .select(`
    pharmacy_name,
    pharmacy_email,
    pharmacy_phone_number,
    updated_at,
    created_at,
    request_status,
    profiles!inner(
        first_name,
        last_name
    )
`, { count: 'exact' }).range(queryFilters.toIndex, queryFilters.fromIndex)

    if (queryFilters.statusFilter) { query = query.eq("request_status", queryFilters.statusFilter) }
    if (queryFilters.patientNameSearch) {query = query.ilike("profiles.first_name", `%${queryFilters.patientNameSearch}%`)}
    return query
};


export type AllTransferRequestsResponse = AsyncReturnType<typeof getAllTransferRequests>
export type GetTransferedRequestsFilters = {
    statusFilter?: Database['public']['Enums']['transfer_request_status'],
    patientNameSearch?: string
} & PaginationFilters;

export async function getTransferedPrescriptions(queryFilters: GetTransferedRequestsFilters): Promise<AllTransferRequestsResponse> {
    const supabase = createClient()
    const result =  await getAllTransferRequests(supabase, queryFilters);
    console.log(result)
    return result;
}