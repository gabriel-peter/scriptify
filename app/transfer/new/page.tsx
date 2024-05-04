import "server-only"
import TransferPrescriptionsPage from "@/app/components/forms/transfer/server-page";

export default function Page() {
    return <TransferPrescriptionsPage successRedirectUrl="/my-dashboard/patient"/>
}