"use client"
import handlePrescriptionTransferRequestForm, { PrescriptionFormatedErrorType, TransferPrescriptionFormValidatedFieldsType } from "@/app/api/transfer/transfer-request-handler";
import AbstractForm from "@/app/components/form/abstract-form";
import GenericInput from "@/app/components/form/generic-input";
import { useState } from "react";
import { useFormState } from "react-dom";


export default function Page({ params, userId }: { params: { requestId: string }, userId: string }) {
    const handlePrescriptionTransferRequestFormWithUserId = handlePrescriptionTransferRequestForm.bind(null, userId);
    const [state, formAction] = useFormState(handlePrescriptionTransferRequestFormWithUserId, { message: '' })
    return (
        <AbstractForm<TransferPrescriptionFormValidatedFieldsType> formAction={formAction} state={state} header="Transfer Prescription for XYZ" redirectUrl={undefined}>
            {params.requestId}
            <GenericInput label={"Transferring Pharmacy NCPDP"} id={"ncpdp"} errorState={state.error?.transferringPharmacy?.ncpdp} errorMessage={"Invalid NCPDP."} />
            <GenericInput label={"Transferring Pharmacist First Name"} id={"transferring-pharmacist-first-name"} errorState={state.error?.transferringPharmacy?.transferringPharmacistFirstName} errorMessage={"Invalid First Name."} />
            <GenericInput label={"Transferring Pharmacist Last Name"} id={"transferring-pharmacist-last-name"} errorState={state.error?.transferringPharmacy?.transferringPharmacistLastName} errorMessage={"Invalid First Name."} />
            <GenericInput label={"Transferring Pharmacist License Number"} id={"transferring-pharmacist-license-number"} errorState={state.error?.transferringPharmacy?.transferringPharmacistLicenseNumber} errorMessage={"Invalid Liscense Number."} />
            <PrescriptionFormList errorState={state.error} />
        </AbstractForm>
    )
}

function PrescriptionForm({ key, prescriptionNumber, errorState }: { key: number, prescriptionNumber: number, errorState: PrescriptionFormatedErrorType | undefined }) {
    return (
        <div key={key}>
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