"use client";
import AbstractForm from "@/components/forms/abstract-form-full-page";
import EmailInput from "@/components/forms/email-input";
import GenericInput from "@/components/forms/generic-input";
import PhoneNumberInput from "@/components/forms/phone-number-input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormState } from "react-dom";
import { Status } from "@/app/actions/validation-helpers";
import { transferPrescription } from "./transfer-request-form-handler";
import { User } from "@supabase/supabase-js";
import { Tables } from "@/types_db";
import { Route } from "next";

export default function TransferPrescriptions({ userWithProfile, successRedirectUrl }: { userWithProfile: {user: User, profile: Tables<"profiles">}, successRedirectUrl: Route<string> }) {
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
                                    onClick={() => router.push("/patient/get-started/clinical")}
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
                        <TransferForm userWithProfile={userWithProfile} setOpenForm={setOpenForm} successRedirectUrl={successRedirectUrl} />}
                </div>
            </div>
        </>);
}

function TransferForm({ setOpenForm, userWithProfile, successRedirectUrl }: { setOpenForm: any, userWithProfile: {user: User, profile: Tables<"profiles">}, successRedirectUrl: Route<string> }) {
    const transferPrescriptionWithUserId = transferPrescription.bind(null, userWithProfile.user.id)
    const [state, formAction] = useFormState(transferPrescriptionWithUserId, { status: Status.NOT_SUBMITTED })
    const router = useRouter()
    return (
        <AbstractForm
            formAction={formAction}
            state={state}
            customSubmitName="Send Email"
            header="Transfer Your Prescriptions"
            successAction={() => router.push(successRedirectUrl)}
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
            <EmailTextBox profile={userWithProfile.profile}/>
        </AbstractForm>
    )
}

function EmailTextBox({profile}:{profile: Tables<"profiles">}) {
    return (
        <div className="my-5 overflow-hidden rounded-lg border border-gray-300 shadow-sm">
            <label htmlFor="title" className="sr-only">
                Title
            </label>
            <input
                type="text"
                name="email-heading"
                id="email-heading"
                className="px-3 block w-full border-0 pt-2.5 text-lg font-medium placeholder:text-gray-400 focus:ring-1"
                defaultValue={`Prescription Transfer for ${profile.first_name} ${profile.last_name}`}
            />
            <label htmlFor="description" className="sr-only">
                Description
            </label>
            <textarea
                rows={4}
                name="email-body"
                id="email-body"
                className="px-3 block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-1 sm:text-sm sm:leading-6"
                placeholder="Write a description..."
                defaultValue={''}
            />
        </div>
    )
}
