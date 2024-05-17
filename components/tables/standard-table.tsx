import { ReactElement, ReactNode } from "react"

export default function Table({
    children,
    title,
    description,
    headers,
    actionButton,
    searchBar
}: {
    children: ReactNode,
    title: string,
    description?: string,
    headers: ReactElement<'th'>[],
    actionButton?: JSX.Element,
    searchBar?: JSX.Element
}) {
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">{title}</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        {description}
                    </p>
                </div>
                {actionButton && <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    {actionButton}
                </div>
                }
            </div>
            <div className="mt-8 flow-root">
                {searchBar}
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr className="divide-x divide-gray-200">
                                    {headers}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {children}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
