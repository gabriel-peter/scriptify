import "server-only";
import TransferPrescriptionsPage from "@/components/forms/transfer/server-page";

export default async function Page() {
    return <TransferPrescriptionsPage successRedirectUrl="/patient/get-started/clinical" />
}
    