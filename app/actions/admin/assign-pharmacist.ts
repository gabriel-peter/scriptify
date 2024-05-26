"use server"
import { createClient } from "@/utils/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";
import { Route } from "next";
import { revalidatePath } from "next/cache";


export async function assignPharmacistToPatient({patientId, pharmacistId}:{patientId: string, pharmacistId: string}, path?: Route<string>): Promise<void> {
    try {
    await createClient().from("pharmacist_to_patient_match").insert({
        patient_id: patientId,
        pharmacist_id: pharmacistId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    }).throwOnError()
    } catch (e) {
        console.log(e)
        throw Error('Unable to assign to patient')
    } 
    if (path) revalidatePath(path, 'page')
}

export async function removePharmacistPatientAssignment({patientId, pharmacistId}:{patientId: string, pharmacistId: string}, path?: Route<string>): Promise<void> {
    try {
    await createClient().from("pharmacist_to_patient_match").delete().eq(
        "patient_id", patientId).eq('pharmacist_id', pharmacistId).throwOnError()
    } catch (e) {
        console.error(e)
        throw Error('Unable to assign to patient')
    }
    if (path) revalidatePath(path, 'page')
}