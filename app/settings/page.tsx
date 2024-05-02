"use server"
import { createClient } from "@/utils/supabase/server";
import SavedCreditCard from "../components/data-views/credit-card-details";
import MedicalInsuranceInfo from "../components/data-views/insurance-details";
import { getUserInsuranceInformation, getUserPaymentInformation } from "../api/user-actions/actions";
import DemographicInfoView from "../components/data-views/demographic-details";


export default async function SettingsPage() {
    const supabase = createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
        return <div>NO USER :(</div>
    }
    
    const [ccDetails, insurance] = await Promise.all([
        getUserPaymentInformation(user.id),
        getUserInsuranceInformation(user.id)
    ])
    return (
    <>
    <DemographicInfoView />
    <SavedCreditCard userId={user.id} ccDetails={ccDetails} />
    <MedicalInsuranceInfo userId={user.id} insurance={insurance} />
    </>
    )
}