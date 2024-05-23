"use server"

import { createClient } from "@/utils/supabase/server"
import { AsyncReturnType } from "@/utils/supabase/types"

export async function getAppointmentsForDay(localIsoDate: string, pharmacistId: string) {
    return await createClient().from('appointments').select('*, users!appointments_patient_id_fkey(*, profiles!inner(*))')
    .eq("pharmacist_id", pharmacistId)
    .gte('start_time', localIsoDate)
}

export type GetAppointmentForDayResponse = AsyncReturnType<typeof getAppointmentsForDay>