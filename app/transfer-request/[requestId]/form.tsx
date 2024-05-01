"use client"
import AbstractForm from "@/app/components/forms/abstract-form";
import GenericInput from "@/app/components/forms/generic-input";
import { useState } from "react";
import { useFormState } from "react-dom";
import handlePrescriptionTransferRequestForm, { PrescriptionFormatedErrorType, TransferPrescriptionFormValidatedFieldsType } from "./external-pharmacist-prescription-transfer";
import { Status } from "@/app/components/forms/validation-helpers";

export default function TransferPage({ params, metadata }: { params: { requestId: string }, metadata: any /*TODO*/ }) {
    const handlePrescriptionTransferRequestFormWithRequestId = handlePrescriptionTransferRequestForm.bind(null, params.requestId);
    const [state, formAction] = useFormState(handlePrescriptionTransferRequestFormWithRequestId, { status: Status.NOT_SUBMITTED })
    return (
        <AbstractForm formAction={formAction} state={state} header={`Transfer Prescription for ${metadata["first_name"]} ${metadata["last_name"]}`} redirectUrl={`/transfer-request/${params.requestId}/review`}>
            <p>To be filled by {metadata['pharmacy_name']} -- {metadata['pharmacy_email']}</p>
            <div className="my-5"></div>
            <GenericInput label={"Pharmacy NCPDP"} id={"ncpdp"} errorState={state.error?.transferringPharmacy?.ncpdp} errorMessage={"Invalid NCPDP."} />
            <GenericInput label={"Pharmacist First Name"} id={"transferring-pharmacist-first-name"} errorState={state.error?.transferringPharmacy?.transferringPharmacistFirstName} errorMessage={"Invalid First Name."} />
            <GenericInput label={"Pharmacist Last Name"} id={"transferring-pharmacist-last-name"} errorState={state.error?.transferringPharmacy?.transferringPharmacistLastName} errorMessage={"Invalid First Name."} />
            <GenericInput label={"Pharmacist License Number"} id={"transferring-pharmacist-license-number"} errorState={state.error?.transferringPharmacy?.transferringPharmacistLicenseNumber} errorMessage={"Invalid Liscense Number."} />
            <PrescriptionFormList errorState={state.error} />
        </AbstractForm>
    )
}

function PrescriptionForm({prescriptionNumber, errorState }: { prescriptionNumber: number, errorState: PrescriptionFormatedErrorType | undefined }) {
    return (
        <div className="my-7">
            <h2>Prescription {prescriptionNumber}</h2>
            <GenericInput label={"Rx Name"} id={`rx-name-${prescriptionNumber}`} errorState={errorState?.rxName} errorMessage={"Invalid Rx Name."} />
            <GenericInput label={"Drug Name"} id={`drug-name-${prescriptionNumber}`} errorState={errorState?.drugName} errorMessage={"Invalid Drug Name."} />
            <GenericInput
                type="date"
                label={"Estimated Date to Fill"}
                id={`estimated-date-to-fill-${prescriptionNumber}`}
                errorState={errorState?.estimatedDateToFill}
                errorMessage={"Invalid Date."}
            />
        </div>
    )
}

function PrescriptionFormList({ errorState }: { errorState: TransferPrescriptionFormValidatedFieldsType | undefined }) {
    const [prescriptionListCount, setPrescriptionListCount] = useState(1);
    // Function to render prescription form fields based on count
    const renderPrescriptionForms = () => {
        const prescriptionForms = [];
        for (let i = 0; i < prescriptionListCount; i++) {
            prescriptionForms.push(
                <PrescriptionForm errorState={errorState?.prescriptions[i] || undefined} key={i} prescriptionNumber={i + 1} />
            );
        }
        return prescriptionForms;
    };

    return (
        <>
            {renderPrescriptionForms()}
            <input type="hidden" name="prescription-count" id="prescription-count" value={prescriptionListCount} />
            <button
                type="button"
                className="rounded-md bg-white my-5 mr-3 px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                onClick={() => setPrescriptionListCount(Math.max(prescriptionListCount - 1, 1))}
            >
                Remove Last Prescription
            </button>
            <button
                type="button"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                onClick={() => setPrescriptionListCount(prescriptionListCount + 1)}
            >
                Add Another Prescription
            </button>
        </>
    );
}