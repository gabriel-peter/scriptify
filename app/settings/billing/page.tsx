import { getUserInsuranceInformation, getUserOrRedirect, getUserPaymentInformation } from "@/app/actions/user/get"
import PageContainer from "@/components/containers/page-container";
import SavedCreditCard from "@/components/data-views/credit-card-details";
import MedicalInsuranceInfo from "@/components/data-views/insurance-details";


export default async function BillingPage() {
    const user = await getUserOrRedirect();
    const [ccDetails, insurance] = await Promise.all([
        getUserPaymentInformation(user.id),
        getUserInsuranceInformation(user.id)
    ])
    return (
        <PageContainer>
            <SavedCreditCard userId={user.id} ccDetails={ccDetails} />
            <MedicalInsuranceInfo userId={user.id} insurance={insurance} />
        </PageContainer>
    )
}