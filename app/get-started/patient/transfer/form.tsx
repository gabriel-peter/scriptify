"use client";
import { transferPrescription } from "@/app/get-started/patient/transfer/patient-prescription-transfer-request-form";
import AbstractForm from "@/app/components/form/abstract-form";
import AddressSubForm from "@/app/components/form/address-sub-form";
import EmailInput from "@/app/components/form/email-input";
import GenericInput from "@/app/components/form/generic-input";
import PhoneNumberInput from "@/app/components/form/phone-number-input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormState } from "react-dom";

export default function TransferPrescriptions({ userId }: { userId: string }) {
    const router = useRouter();
    const [openForm, setOpenForm] = useState(false);
    return (
        <>
            <div className="space-y-12 mt-5">
                <div className="border-b border-gray-900/10 pb-12">
                    <div className="flex justify-center mt-10">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Do you have current prescription you would like to transfer?</h2>
                    </div>
                    {!openForm ?
                        (
                            <div className="flex my-10 space-y-12 items-center justify-center">
                                <div></div>
                                <button
                                    type="button"
                                    onClick={() => router.push("/get-started/patient/clinical")}
                                    className="w-64 h-64 bg-red-50 rounded-lg text-lg font-semibold text-red-600 shadow-lg hover:bg-red-100 flex justify-center items-center mx-4">
                                    No
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setOpenForm(true)}
                                    className="w-64 h-64 bg-green-50 rounded-lg text-lg font-semibold text-green-600 shadow-lg hover:bg-green-100 flex justify-center items-center mx-4">
                                    Yes
                                </button>
                            </div>
                        ) :
                        <TransferForm userId={userId} setOpenForm={setOpenForm} />}
                </div>
            </div>
        </>);
}

const initialState = {
    message: '',
}

function TransferForm({ setOpenForm, userId }: { setOpenForm: any, userId: string }) {
    const transferPrescriptionWithUserId = transferPrescription.bind(null, userId)
    const [state, formAction] = useFormState(transferPrescriptionWithUserId, initialState)
    return (
        <AbstractForm
            formAction={formAction}
            state={state}
            header="Transfer Your Prescriptions"
            redirectUrl="/get-started/patient/clinical"
        >
            <GenericInput
                label="Pharmacy Name"
                id="pharmacy-name"
                errorState={state?.error?.pharmacyName}
                errorMessage={"Invalid Pharmacy Name"}
            />
            <EmailInput
                label="Email of your Pharmacy"
                errorState={state?.error?.email}
            />
            <PhoneNumberInput
                label="Phone Number of your Pharmacy"
                errorState={state?.error?.phoneNumber}
            />
            <AddressSubForm errorState={state.error} />
        </AbstractForm>
    )
}