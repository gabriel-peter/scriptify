import React from "react";
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'

export default function AbstractInput({ errorMessage, error, children }: { errorMessage?: string, error: string[] | undefined, children: React.ReactNode }) {
    return (
        <>
            {error !== undefined ?
                (
                    <>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            {children}
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                            </div>
                        </div>
                        <p className="mt-2 text-sm text-red-600" id="error">
                            {errorMessage || error._errors.join(".")} {/* TODO */}
                        </p>
                    </>
                ) :
                <>
                    <div className="relative mt-2 rounded-md shadow-sm">
                        {children}
                    </div>
                </>
            }
        </>
    )
}