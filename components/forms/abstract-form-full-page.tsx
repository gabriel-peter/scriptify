import React, { ReactElement } from "react";
import { SubmitButton } from "./submit-button";
import { FormSubmissionReturn, Status } from "../../app/actions/validation-helpers";
import { Heading, Subheading } from "../catalyst-ui/heading";

export default function AbstractForm<T>({
    children,
    formAction,
    state,
    header,
    description,
    customSubmitName,
    successAction,
    secondaryButton
}: {
    children: any,
    formAction: (payload: FormData) => void,
    state: FormSubmissionReturn<T>,
    header: string
    description?: string
    customSubmitName?: string,
    successAction: () => void, // TODO this can be redirect method
    secondaryButton?: () => ReactElement
}
) {
    return (
        <form action={formAction}>
            <div className="space-y-12 mt-5">
                <div className="border-b border-gray-900/10 pb-12">
                    <Heading>
                        {header}
                        </Heading>
                    { description && 
                    <Subheading>
                        {description}
                    </Subheading>}
                    {children}
                </div>
                <p className="mt-2 text-sm text-red-600">{state.status === Status.ERROR && state.message}</p>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
                {secondaryButton && secondaryButton()}
                <SubmitButton successAction={successAction} customTitle={customSubmitName} isSuccess={state?.status === Status.SUCCESS} />
            </div>
        </form>
    );
}