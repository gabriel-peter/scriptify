import { ReactElement, ReactNode } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/catalyst-ui/table'
import { Heading } from "../catalyst-ui/heading"

export default function CustomTable({
    children,
    headers,
    actionButton,
}: {
    children: ReactNode,
    headers: ReactElement<'Framgment'>,
    actionButton?: JSX.Element,
}) {
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            {/* <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <p className="mt-2 text-sm text-gray-700 dark:text-white">
                        {description}
                    </p>
                </div>
                {actionButton && <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    {actionButton}
                </div>
                }
            </div> */}
            <div className="mt-8 flow-root">
                {/* {searchBar} */}
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <Table bleed className="[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]">
                        <TableHead>
                            <TableRow>
                                {headers}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {children}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
