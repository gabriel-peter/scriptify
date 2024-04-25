import React from "react";
import { SubmitButton } from "./submit-button";

type GenericFormState<T> = { error: T; message?: undefined } | { message: string; error?: undefined };
export default function AbstractForm<T>({
    children,
    formAction,
    state,
    redirectUrl,
    header,
    description
}: {
    children: any,
    formAction: (payload: FormData) => void,
    state: GenericFormState<T>,
    redirectUrl?: string,
    header: string
    description?: string
}
) {
    return (
        <form action={formAction}>
            <div className="space-y-12 mt-5">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">{header}</h2>
                    { description && 
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        {description}
                    </p>}
                    {children}
                </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
                {/* TODO previous button that goes to previous page */}
                <SubmitButton redirectUrl={state?.message && redirectUrl} />
            </div>
        </form>
    );
}