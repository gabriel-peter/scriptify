"use server"

import { Database } from "@/types_db"
import { ACCOUNT_TYPE } from "@/utils/enums";
import { createClient } from "@/utils/supabase/server"
import { AsyncReturnType } from "@/utils/supabase/types";
import { PostgrestError, QueryData, SupabaseClient } from "@supabase/supabase-js"

const userProfileQuery = async (client: SupabaseClient<Database>, limit?: number, accountTypeFilter?: ACCOUNT_TYPE) => { 
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
    `)
    .limit(limit || 20)

    if (accountTypeFilter) { query = query.eq("raw_user_meta_data->account_type", accountTypeFilter.toString())}

    return query
};
export type UserProfileResponse = AsyncReturnType<typeof userProfileQuery>

export async function getUsersPaginated(filter?: any, limit?: number, accountTypeFilter?: ACCOUNT_TYPE): Promise<UserProfileResponse> {
    const supabase = createClient()
    return await userProfileQuery(supabase, limit, accountTypeFilter);
}

