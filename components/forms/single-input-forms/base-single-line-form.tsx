"use client"

import { ReactNode, useEffect, useState } from "react"
import { SubmitButton } from "../submit-button"
import { useFormState } from "react-dom"
import { FormSubmissionReturn, Status } from "../../../app/actions/validation-helpers"
import ActionResultDialog from "../../dialogs/error-or-success-dialog"
import { useRouter } from "next/navigation"

export function UpdateRow(
    {
        title,
        value,
        updateAction,
        successAction,
        children,
        alertDetails
    }: {
        title: string,
        value: string,
        updateAction: (prevState: any, form: FormData) => Promise<FormSubmissionReturn<any>>,
        children: ReactNode,
        alertDetails: {title: string, description: string}
        successAction: () => void
    }
) {
    const [isEdit, setIsEdit] = useState(false)
    const [state, formAction] = useFormState(updateAction, { status: Status.NOT_SUBMITTED })
    const [showDialog, setShowDialog] = useState(false);
    useEffect(() => {
        if (state.status === Status.SUCCESS) { // This is to prevent alert spam, TODO better solution?
            setIsEdit(false)
            setShowDialog(true)
        }
    }, [state])
    return (
        <>
            <ActionResultDialog
                open={showDialog}
                setOpen={setShowDialog}
                isError={false}
                title={alertDetails.title}
                description={alertDetails.description}
                dismissAction={() => {
                    setShowDialog(false);
                    successAction()
                }}
            />
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
                                {children}
                                <>
                                    <button
                                        type="button"
                                        onClick={() => setIsEdit(false)}
                                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                                    >
                                        Cancel
                                    </button>
                                    <SubmitButton successAction={() => {
                                    }} isSuccess={state.status === Status.SUCCESS} />
                                </>
                            </dd>
                        )}
                </div>
                {state.status === Status.ERROR && <p className="mt-2 text-sm text-red-600" id="error">{state.message}</p>}
            </form>
        </>
    )
}