"use client"
import AbstractForm from "@/components/forms/abstract-form-full-page";
import MedicalInsuranceInput from "@/components/payment/medical-insurance-input";
import { useFormState } from "react-dom";
import { Status } from "@/components/forms/validation-helpers";
import saveMedicalInsuranceForm, { FieldErrors } from "./insurance-form-handler";
import { useRouter } from "next/navigation";
import { Route } from "next";


export default function InsuranceInputForm({ userId, redirectUrl, successAction }: { userId: string, redirectUrl?: Route<string>, successAction?: () => void }) {
    const saveMedicalInsuranceFormWithUserId = saveMedicalInsuranceForm.bind(null, userId)
    const [state, formAction] = useFormState(saveMedicalInsuranceFormWithUserId, { status: Status.NOT_SUBMITTED })
    const router = useRouter()
    return (
        <AbstractForm<FieldErrors>
            formAction={formAction}
            state={state}
            successAction={successAction? () => successAction(): () => router.push(redirectUrl!)}
            description="Enter the insurance details from your insurance card"
            header={"Insurance Information"}
            secondaryButton={() => <button onClick={successAction? () => successAction(): () => router.push(redirectUrl!)}>Skip</button>}
        >
            <MedicalInsuranceInput errorState={state.error} />
        </AbstractForm>
    )
}