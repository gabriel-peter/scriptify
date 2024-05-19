"use server"
import { Database } from "@/types_db";
import { ACCOUNT_TYPE } from "@/utils/enums";
import { createClient } from "@/utils/supabase/server";
import { AsyncReturnType } from "@/utils/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";


export type GetPharmacistQueryFilters = {
    nameSearch?: string
}


export async function getPharmacistsSearch(supabase: SupabaseClient<Database>,  filters: GetPharmacistQueryFilters) {
   let query =  supabase.from("users")
   .select(`*,
   profiles!inner(*)
   `).eq('raw_user_meta_data->>account_type', "PHARMACIST");

    if (filters.nameSearch) {query = query.ilike('profiles.first_name', `%${filters.nameSearch}%`)}

   return query;
}

export type GetPharmacistsSearchResponse = AsyncReturnType<typeof getPharmacistsSearch> 

export async function getPharmacists(filters: GetPharmacistQueryFilters) {
    const supabase = createClient()
    const result = await getPharmacistsSearch(supabase, filters)
    console.log(result)
    return result
}

export async function getPharmacistsByUserIds(pharmacist_ids: string[]) {
    return await createClient().from("users")
    .select(`*,
    profiles!inner(*)
    `).in("id", pharmacist_ids);
}

export type GetPharmacistByUserIdResponse = AsyncReturnType<typeof getPharmacistsByUserIds>