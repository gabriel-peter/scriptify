"use client"
import saveMedicalInsuranceForm, { InsuranceFormValidatedFieldsType } from "@/app/api/patient-get-started/insurance-form-handler";
import AbstractForm from "@/app/components/form/abstract-form";
import MedicalInsuranceInput from "@/app/components/payment/medical-insurance-input";
import { useFormState } from "react-dom";

export default function InsuranceInputPage({ userId }: { userId: string }) {
    const saveMedicalInsuranceFormWithUserId = saveMedicalInsuranceForm.bind(null, userId)
    const [state, formAction] = useFormState(saveMedicalInsuranceFormWithUserId, { message: '' })
    return (
        <AbstractForm<InsuranceFormValidatedFieldsType>
            formAction={formAction}
            state={state}
            redirectUrl={"/get-started/patient/payment-details"}
            description=""
            header={"Insurance Information"}
        >
            <MedicalInsuranceInput errorState={state.error} />
        </AbstractForm>
    )
}