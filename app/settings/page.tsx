"use server"
import { createClient } from "@/utils/supabase/server";
import SavedCreditCard from "../components/data-views/credit-card-details";


export default async function SettingsPage() {
    const supabase = createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
        return <div>NO USER :(</div>
    }
    return <SavedCreditCard userId={user.id} />
}