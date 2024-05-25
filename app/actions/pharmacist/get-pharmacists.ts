"use server"
import { Status } from "@/app/actions/validation-helpers";
import { Database, Tables } from "@/types_db";
import { createClient } from "@/utils/supabase/server";
import { AsyncReturnType } from "@/utils/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { getPatientById, GetPatientByIdResponse } from "../patient/get-patient";


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
type GetElementType<T extends any[] | null> = T extends (infer U)[] ? U : never;

export type SingleGetPharmacistsSearchResponse = GetElementType<GetPharmacistsSearchResponse['data']>



export async function getPharmacists(patientId: string, filters: GetPharmacistQueryFilters) {
    const supabase = createClient()
    const {error, data, count} = await getPharmacistsSearch(supabase, filters)
    if (error) {
        return {status: Status.ERROR}
    }
    const patient = await getPatientById(supabase, patientId)
    if (patient.error) {
        return { status: Status.ERROR }
    }
    const ratedPharmacists = scorePharmacistCompatability(patient.data, data)
    return ratedPharmacists
}

function isCompatible(pharmacist: Tables<'profiles'>, patient: Tables<'profiles'> & Tables<'patient_clinical_preferences'>) {
    // if (pharmacist.)
        return true // TODO this need to be 
}

function scorePharmacistCompatability(patient: GetPatientByIdResponse['data'], pharmacists: GetPharmacistsSearchResponse['data'])  {
    return pharmacists?.filter(pharmacist => ({...pharmacist, compatible: isCompatible(pharmacist, patient)}))
}

export async function getPharmacistsByUserIds(pharmacist_ids: string[]) {
    return await createClient().from("users")
    .select(`*,
    profiles!inner(*)
    `).in("id", pharmacist_ids);
}

export type GetPharmacistByUserIdResponse = AsyncReturnType<typeof getPharmacistsByUserIds>