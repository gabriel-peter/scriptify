import { cn } from "@/utils/cn"
import { ReactElement, ReactNode } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/catalyst-ui/table'
import { Heading } from "../catalyst-ui/heading"

// function Example({ users }) {
//   return (
//     <Table>
//       <TableHead>
//         <TableRow>
//           <TableHeader>Name</TableHeader>
//           <TableHeader>Email</TableHeader>
//           <TableHeader>Role</TableHeader>
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {users.map((user) => (
//           <TableRow key={user.handle}>
//             <TableCell className="font-medium">{user.name}</TableCell>
//             <TableCell>{user.email}</TableCell>
//             <TableCell className="text-zinc-500">{user.access}</TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   )
// }

export default function CustomTable({
    children,
    title,
    description,
    headers,
    actionButton,
    searchBar,
    customStyle
}: {
    children: ReactNode,
    title: string,
    description?: string,
    headers: ReactElement<'th'>[],
    actionButton?: JSX.Element,
    searchBar?: JSX.Element,
    customStyle?: string
}) {
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <Heading>{title}</Heading>
                    <p className="mt-2 text-sm text-gray-700 dark:text-white">
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
                    {/* <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"> */}
                        <Table 
                        bleed className="[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]"
                        // className={cn(customStyle ? customStyle: "", "min-w-full divide-y divide-gray-300")}
                        >
                            <TableHead>
                                <TableRow 
                                // className="divide-x divide-gray-200"
                                >
                                    {headers}
                                </TableRow>
                            </TableHead>
                            <TableBody> {/* divide-y divide-gray-200 */}
                                {children}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        // </div>
    )
}
