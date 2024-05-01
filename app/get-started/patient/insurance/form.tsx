"use client"
import saveMedicalInsuranceForm, { FieldErrors } from "@/app/get-started/patient/insurance/insurance-form-handler";
import AbstractForm from "@/app/components/forms/abstract-form";
import MedicalInsuranceInput from "@/app/components/payment/medical-insurance-input";
import { useFormState } from "react-dom";
import { Status } from "@/app/components/forms/validation-helpers";

export default function InsuranceInputPage({ userId }: { userId: string }) {
    const saveMedicalInsuranceFormWithUserId = saveMedicalInsuranceForm.bind(null, userId)
    const [state, formAction] = useFormState(saveMedicalInsuranceFormWithUserId, { status: Status.NOT_SUBMITTED })
    return (
        <AbstractForm<FieldErrors>
            formAction={formAction}
            state={state}
            redirectUrl={"/get-started/patient/payment"}
            description=""
            header={"Insurance Information"}
        >
            <MedicalInsuranceInput errorState={state.error} />
        </AbstractForm>
    )
}