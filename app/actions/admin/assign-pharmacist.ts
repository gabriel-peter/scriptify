"use server"
import { createClient } from "@/utils/supabase/server";


export async function assignPharmacistToPatient({patientId, pharmacistId}:{patientId: string, pharmacistId: string}) {
    const supabase = createClient()
    const {data, error} = await supabase.from("pharmacist_to_patient_match").insert({
        patient_id: patientId,
        pharmacist_id: pharmacistId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    });
    console.log({error, data})
    return {error, data}
}

export async function removePharmacistPatientAssignment({patientId, pharmacistId}:{patientId: string, pharmacistId: string}) {
    const {data, error} = await createClient().from("pharmacist_to_patient_match").delete().eq(
        "patient_id", patientId).eq('pharmacist_id', pharmacistId);
    console.log({error, data})
    return {error, data}
}