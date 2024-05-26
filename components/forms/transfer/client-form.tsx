"use client";
import AbstractForm from "@/components/forms/abstract-form-full-page";
import GenericInput from "@/components/forms/generic-input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormState } from "react-dom";
import { Status } from "@/app/actions/validation-helpers";
import { transferPrescription } from "./transfer-request-form-handler";
import { User } from "@supabase/supabase-js";
import { Tables } from "@/types_db";
import { Route } from "next";
import { Input, InputGroup } from "@/components/catalyst-ui/input";
import { Textarea } from "@/components/catalyst-ui/textarea";
import { Field, Fieldset, Label } from "@/components/catalyst-ui/fieldset";

export default function TransferPrescriptions({ userWithProfile, successRedirectUrl }: { userWithProfile: { user: User, profile: Tables<"profiles"> }, successRedirectUrl: Route<string> }) {
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

function TransferForm({ setOpenForm, userWithProfile, successRedirectUrl }: { setOpenForm: any, userWithProfile: { user: User, profile: Tables<"profiles"> }, successRedirectUrl: Route<string> }) {
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
            <GenericInput
                label="Email of your Pharmacy"
                id="email"
                type="email"
                errorState={state?.error?.email}
            />
            <GenericInput
                label="Phone Number of your Pharmacy"
                type="tel"
                id="phone-number"
                placeholder="+1 555-987-6543"
                errorState={state?.error?.phoneNumber}
            />
            <EmailTextBox profile={userWithProfile.profile} />
        </AbstractForm>
    )
}

function EmailTextBox({ profile }: { profile: Tables<"profiles"> }) {
    return (
        <Fieldset>
            <Field  >
                <Label htmlFor="title" className="sr-only">
                    Title
                </Label>
                <Input
                    name="email-heading"
                    id="email-heading"
                    defaultValue={`Prescription Transfer for ${profile.first_name} ${profile.last_name}`}
                />
            </Field>
            <Field>
                <Label htmlFor="description" className="sr-only">
                    Description
                </Label>
                <Textarea
                    rows={4}
                    name="email-body"
                    id="email-body"
                    placeholder="Write a brief email on which prescriptions you would like transfered..."
                    defaultValue={''}
                />
            </Field>
        </Fieldset>
    )
}
