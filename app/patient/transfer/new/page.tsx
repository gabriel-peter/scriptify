import "server-only"
import TransferPrescriptionsPage from "@/components/forms/transfer/server-page";

export default function Page() {
    return <TransferPrescriptionsPage successRedirectUrl="/patient/my-dashboard"/>
}