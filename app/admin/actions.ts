"use server"

import { Database } from "@/types_db"
import { ACCOUNT_TYPE } from "@/utils/enums";
import { createClient } from "@/utils/supabase/server"
import { AsyncReturnType, PaginationFilters } from "@/utils/supabase/types";
import { PostgrestError, QueryData, SupabaseClient } from "@supabase/supabase-js"

export type GetUsersPaginatedFilter = {
    accountTypeFilter?: ACCOUNT_TYPE
} & PaginationFilters;

const userProfileQuery = async (client: SupabaseClient<Database>, filters: GetUsersPaginatedFilter) => { 
    let query = client.from("users").select(`
        id,
        email,
        raw_user_meta_data->account_type,
        last_sign_in_at,
        created_at,
        profiles (
            id,
            first_name,
            last_name
        )
    `, {count: "exact"})
    .range(filters.toIndex, filters.fromIndex)

    if (filters.accountTypeFilter) { query = query.eq("raw_user_meta_data->account_type", filters.accountTypeFilter.toString())}

    return query
};
export type UserProfileResponse = AsyncReturnType<typeof userProfileQuery>

export async function getUsersPaginated(filters: GetUsersPaginatedFilter): Promise<UserProfileResponse> {
    const supabase = createClient()
    return await userProfileQuery(supabase, filters);
}

