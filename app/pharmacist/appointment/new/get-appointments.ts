"use server"

import { createClient } from "@/utils/supabase/server"
import { AsyncReturnType } from "@/utils/supabase/types"
import moment from "moment"

export async function getAppointmentsForDay(localIsoDate: string, pharmacistId: string) {
    return await createClient().from('appointments').select('*, users!appointments_patient_id_fkey(*, profiles!inner(*))')
    .eq("pharmacist_id", pharmacistId)
    .gte('start_time', localIsoDate)
    .lt('end_time', moment(localIsoDate).endOf('D').toISOString())
    // .then(({data, error}) => data?.filter(d => d !== null))
}

export type GetAppointmentForDayResponse = AsyncReturnType<typeof getAppointmentsForDay>