import React from "react";
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'

export default function InputError({ errorMessage, error, children }: { errorMessage?: string, error: string[] | undefined, children: React.ReactNode }) {
    return (
        <>
            {error !== undefined ?
                (
                    <>
                        <div className="relative rounded-md shadow-sm">
                            {children}
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                            </div>
                        </div>
                        <p className="mt-2 text-sm text-red-600" id="error">
                            {errorMessage || error[0]} {/* TODO */}
                        </p>
                    </>
                ) :
                <>
                    <div className="relative rounded-md shadow-sm">
                        {children}
                    </div>
                </>
            }
        </>
    )
}