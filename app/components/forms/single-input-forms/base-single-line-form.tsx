"use client"

import { useState } from "react"
import { SubmitButton } from "../submit-button"
import AbstractInput from "../abstract-input"
import { inputStyling } from "../styling"
import { useFormState } from "react-dom"
import { FormSubmissionReturn, Status } from "../validation-helpers"

export function UpdateRow({ title, value, updateAction }: { title: string, value: string, updateAction: (prevState: any, form: FormData) => FormSubmissionReturn<any> }) {
    const [isEdit, setIsEdit] = useState(false)
    const [state, formAction] = useFormState(updateAction, { status: Status.NOT_SUBMITTED })
    return (
        <form action={formAction}>
            <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">{title}</dt>
                {!isEdit ?
                    (
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="text-gray-900">{value}</div>
                            <button
                                type="button"
                                onClick={() => setIsEdit(true)}
                                className="font-semibold text-indigo-600 hover:text-indigo-500"
                            >
                                Update
                            </button>
                        </dd>
                    ) :
                    (
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            {/* <AbstractInput error={state.error}> */}
                            <input
                                type="text"
                                name="new-email"
                                id="new-email"
                                autoComplete="email"
                                className={inputStyling}
                            />
                            {/* </AbstractInput> */}
                            <>
                                <button
                                    type="button"
                                    onClick={() => setIsEdit(false)}
                                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                                >
                                    Cancel
                                </button>
                                <SubmitButton successAction={() => {
                                    setIsEdit(false)
                                    alert("Check confirmation links in both the new and old emails.") // TODO make banner
                                }} isSuccess={state.status === Status.SUCCESS} />
                            </>
                        </dd>
                    )}
            </div>
        </form>
    )
}