"use server"
import { GetUsersPaginatedFilter } from "@/app/admin/actions";
import { Database } from "@/types_db";
import { ACCOUNT_TYPE } from "@/utils/enums";
import { createClient } from "@/utils/supabase/server";
import { AsyncReturnType, PaginationFilters } from "@/utils/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";

export type GetPatientsPaginatedFilter = {
    stateFilter?: string,
    nameSearch?: string
} & PaginationFilters;

const patientQuery = async (client: SupabaseClient<Database>, filters: GetPatientsPaginatedFilter) => { 
    let query = client.from("users").select(`
        id,
        email,
        raw_user_meta_data->account_type,
        last_sign_in_at,
        created_at,
        profiles!inner(
            id,
            first_name,
            last_name,
            state_enum
        )
    `, {count: "exact"})
    .eq('raw_user_meta_data->>account_type', ACCOUNT_TYPE.PATIENT)
    .range(filters.toIndex, filters.fromIndex)

    if (filters.nameSearch) {query = query.ilike("profiles.first_name", `%${filters.nameSearch}%`)}
    if (filters.stateFilter) {query = query.eq("profiles.state_enum", filters.stateFilter)}
    return query
};
export type PatientsPaginatedResponse = AsyncReturnType<typeof patientQuery>

export async function getPatientsPaginated(filters: GetUsersPaginatedFilter): Promise<UserProfileResponse> {
    const supabase = createClient()
    const result = await patientQuery(supabase, filters);
    console.log(result)
    return result
}

