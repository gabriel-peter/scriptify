"use client";
import AddressSubForm from "@/app/components/form/address-sub-form";
import PhoneNumberInput from "@/app/components/form/phone-number-input";
import { SubmitButton } from "@/app/components/form/submit-button";
import Link from "next/link";
import { useState } from "react";

export default function TransferPrescriptions() {
    const [openForm, setOpenForm] = useState(false);
    return (
        <>
            {!openForm ?
                (<div className="flex align-center my-10 space-y-12 justify-center">
                    <button
                        type="button"
                        onClick={() => setOpenForm(true)}
                        className="w-64 h-64 bg-indigo-50 rounded-lg text-lg font-semibold text-indigo-600 shadow-lg hover:bg-indigo-100 flex justify-center items-center mx-4">
                        Transfer Prescriptions
                    </button>
                </div>) :
                <TransferForm setOpenForm={setOpenForm} />}
        </>);
}

function TransferForm({ setOpenForm }: { setOpenForm: any }) {
    return (
        <form>
            <div className="space-y-12">
                {/* <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2> */}


                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Prescription Transfer Form</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">TODO</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Pharmacy Name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Pharmacy Email address (optional)
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <PhoneNumberInput label={""} />



                        <AddressSubForm />

                    </div>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                    type="button"
                    onClick={() => setOpenForm(false)}
                    className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </button>
                <SubmitButton />
            </div>
        </form>
    )
}