"use server"
import { createClient } from "@/utils/supabase/server";
import SavedCreditCard from "../components/data-views/credit-card-details";
import MedicalInsuranceInfo from "../components/data-views/insurance-details";
import { getUserInsuranceInformation, getUserPaymentInformation } from "../api/user-actions/actions";
import DemographicInfoView from "../components/data-views/demographic-details";
import ChangableProfilePhoto from "../components/data-views/changeable-profile-photo";
import { Database } from "@/types_db";
import { SupabaseClient, User } from "@supabase/supabase-js";


export default async function SettingsPage() {
    const supabase = createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
        return <div>NO USER :(</div>
    }



    return (
        <>
            <DemographicInfoView />


            {/* Patient Specific */}
            {user.user_metadata['account_type'] === 'Patient' && patientInfo(supabase, user)}
            {user.user_metadata['account_type'] === 'Pharmacist' && pharmacistInfo(supabase, user)}
        </>
    )
}

async function patientInfo(supabase: SupabaseClient<Database>, user: User) {
    const [ccDetails, insurance] = await Promise.all([
        getUserPaymentInformation(user.id),
        getUserInsuranceInformation(user.id)
    ])
    return (
        <>
            <SavedCreditCard userId={user.id} ccDetails={ccDetails} />
            <MedicalInsuranceInfo userId={user.id} insurance={insurance} />
        </>
    )
}

async function pharmacistInfo(supabase: SupabaseClient<Database>, user: User) {
    return (
        <>
            TODO
        </>
    )
}