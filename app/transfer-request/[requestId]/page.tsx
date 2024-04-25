"use server";
/**
 * TODO this needs to have anonmymous login from a pharmacist with a magic link
 * Routing needs to be unique on this page.
 */
import { createClient } from "@/utils/supabase/server";
import TransferPage from "./form";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database, Tables } from "@/types_db";

async function getUserProfile(supabase: SupabaseClient<Database>, userId: string): Promise<Tables<'profiles'> | null> {
    const { data, error, status } = await supabase.from("profiles").select("*").eq("id", userId).limit(1).single();
    console.log("USER DATA", data)
    return data
}

export default async function PharmacistTransferPrescriptionsPage({ params }: { params: { requestId: string } }) {
    const supabase = createClient()
    const { data, error, status } = await supabase.from("transfer_requests").select("*").eq("id", params.requestId).limit(1).single();

    console.log("STATUS", status)
    if (error) {
        console.log(error)
        return <div>ERROR: {error.message}</div>
    }
    const metadata = {...data, ...await getUserProfile(supabase, data.user_id)}
    console.log("metadata", metadata)
    return <TransferPage params={params} metadata={metadata} />
}