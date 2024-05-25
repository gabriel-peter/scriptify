"use client"

export function ClientActions({patientId, pharmacistId}: {patientId: string, pharmacistId: string}) {

    return (
        <div className="flex items-center gap-x-4 sm:gap-x-6">
            <button type="button" className="hidden text-sm font-semibold leading-6 text-gray-900 sm:block">
                Copy URL
            </button>
            <a href="#" className="hidden text-sm font-semibold leading-6 text-gray-900 sm:block">
                Edit
            </a>
            <button
                // onClick={() => }
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Assign to Me
            </button>
        </div>
    )
}