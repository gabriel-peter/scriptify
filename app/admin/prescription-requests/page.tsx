import Table from "@/components/tables/standard-table";
import { getTransferedPrescriptions } from "./get-prescription-transfers"
import { Suspense } from "react";
const people = [
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    // More people...
]

export default async function PrescriptionRequestPage() {
    const { error, data } = await getTransferedPrescriptions(5);
    console.log(data)
    return (
        <Table
            title={"Prescription Transfers"}
            headers={[
                <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Name
                </th>,
                <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Title
                </th>,
                <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Email
                </th>,
                <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-0">
                    Role
                </th>
            ]}
            actionButton={<button
                type="button"
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Add user
            </button>}
            description="Test"
        >
            {people.map((person) => (
                <tr key={person.email} className="divide-x divide-gray-200">
                    <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
                        {person.name}
                    </td>
                    <td className="whitespace-nowrap p-4 text-sm text-gray-500">{person.title}</td>
                    <td className="whitespace-nowrap p-4 text-sm text-gray-500">{person.email}</td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-0">{person.role}</td>
                </tr>
            ))}
        </Table>
    )
}