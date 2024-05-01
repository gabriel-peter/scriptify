"use client"
import AbstractForm from "@/app/components/forms/abstract-form";
import MedicalInsuranceInput from "@/app/components/payment/medical-insurance-input";
import { useFormState } from "react-dom";
import { Status } from "@/app/components/forms/validation-helpers";
import saveMedicalInsuranceForm, { FieldErrors } from "./insurance-form-handler";
import { useRouter } from "next/navigation";


export default function InsuranceInputPage({ userId }: { userId: string }) {
    const saveMedicalInsuranceFormWithUserId = saveMedicalInsuranceForm.bind(null, userId)
    const [state, formAction] = useFormState(saveMedicalInsuranceFormWithUserId, { status: Status.NOT_SUBMITTED })
    const router = useRouter()
    return (
        <AbstractForm<FieldErrors>
            formAction={formAction}
            state={state}
            successAction={() => router.push("/get-started/patient/payment")}
            description=""
            header={"Insurance Information"}
        >
            <MedicalInsuranceInput errorState={state.error} />
        </AbstractForm>
    )
}