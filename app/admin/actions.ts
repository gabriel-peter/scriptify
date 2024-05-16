"use server"

import { Database } from "@/types_db"
import { createClient } from "@/utils/supabase/server"
import { PostgrestError, QueryData, SupabaseClient } from "@supabase/supabase-js"

// Filterable by user attribute
// Gets assigned pharmacist
// Etc.

type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (
    ...args: any
  ) => Promise<infer R>
    ? R
    : any;

const userProfileQuery = async (client: SupabaseClient<Database>, limit?: number) => client.from("users").select(`
    id,
    email,
    raw_user_meta_data->account_type,
    created_at,
    profiles (
        id,
        first_name,
        last_name
    )
    `).limit(limit || 20);
export type UserProfileResponse = AsyncReturnType<typeof userProfileQuery>

export async function getUsersPaginated(filter?: any, limit?: number){
    const supabase = createClient()
    // const {error, data} = await supabase.from("user_profiles").select("*").limit(limit || 20)
    

    // TODO the goal of profiles is to create copy of auth.users info that is wanted and just manipulate that table.
    // Re-instant the trigger.
    const result: UserProfileResponse = await userProfileQuery(supabase, limit);
    console.log(result.data, result.error)
    return result;
}

