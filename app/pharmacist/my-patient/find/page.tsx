'use client'

import { useEffect, useState } from "react";
import { getPatientsPaginated, GetPatientsPaginatedFilter, PatientsPaginatedResponse } from "../../../actions/patient/get-patients";
import Paginator, { resetPageIndices } from "@/components/tables/pagination-footer";
import Table from "@/components/tables/standard-table";
import { UsersIcon } from "@heroicons/react/24/solid";
import { stringifyName } from "@/utils/user-attribute-modifiers";
import Link from "next/link";
import { ActionDropDown } from "@/components/tables/action-dropdown";
import SearchBar from "@/components/search/simple-searchbar";
import { states } from "@/app/actions/options";
import ColumnFilter from "@/components/tables/column-filter-dropdown";
import { useRouter } from "next/navigation";

const statesWithUndefined: (string | undefined)[] = [undefined]; 
states.map(state => statesWithUndefined.push(state))
const PAGE_SIZE = 15;

export default function PatientFinderPage() {
    const [patients, setPatients] = useState<PatientsPaginatedResponse>();
    const [queryFilters, setQueryFilters] = useState<GetPatientsPaginatedFilter>({
        toIndex: 0,
        fromIndex: PAGE_SIZE
    });
    const [count, setCount] = useState<number | null>(null);
    useEffect(() => {
        getPatientsPaginated(queryFilters).then((result) => { setPatients(result); setCount(result.count) })
    }, [queryFilters, setQueryFilters, count, setCount])
    return ( <>
        <Table
            customStyle="bottom-0"
            searchBar={<SearchBar
                text={queryFilters.nameSearch}
                setText={(e) => setQueryFilters(
                    {
                        ...queryFilters,
                        ...resetPageIndices(PAGE_SIZE),
                        nameSearch: e
                    })}
            />}
            title={"Patient Search"}
            headers={[
                <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Full Name
                </th>,
                <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900">
                    Email
                </th>,
                <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                    <ColumnFilter columnName="State" filterValue={queryFilters.stateFilter} filterHandlers={
                        (statesWithUndefined).map((value) => {
                            return {
                                name: value ? value : "Clear",
                                setFilter: () => setQueryFilters(
                                    {
                                        ...queryFilters,
                                        ...resetPageIndices(PAGE_SIZE),
                                        stateFilter: value
                                    })
                            }
                        })
                    } />
                </th>,
                <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-0">
                    Actions
                </th>
            ]}
        >
            {/* <Suspense fallback={<p>"Loading Users..."</p>}> */}
            <TableContent patients={patients} />
            {/* </Suspense> */}
        </Table>
        <Paginator
            resultCount={count || 0}
            queryFilters={queryFilters}
            setQueryFilters={setQueryFilters}
            pageSize={PAGE_SIZE} />
    </>)
}


function TableContent({ patients }: { patients: PatientsPaginatedResponse | undefined }) {
    const router = useRouter();
    // const users = await getUsersPaginated(queryFilters)
    // .then((users) => {setCount(users.count); return users});
    if (!patients || !patients.data) {
        return <></>
    }
    if (patients.data.length === 0) {
        return (<div className="px-6 py-14 text-center text-sm sm:px-14">
        <UsersIcon className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
        <p className="mt-4 font-semibold text-gray-900">No people found</p>
        <p className="mt-2 text-gray-500">
            We couldn’t find anything with that term. Please try again.
        </p>
    </div>)
    }
    return patients.data.map((user, indx) => (
        <tr key={indx} className="divide-x divide-gray-200">
            <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
                <Link
                    href={`/admin/patient/${user.id}`}
                    className="hover:underline"
                >
                    {stringifyName(user.profiles!)}
                </Link>
            </td>
            <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                {user.email}
            </td>
            <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                {user.profiles?.state_enum}
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-0">
                <ActionDropDown actions={[
                    { name: 'View Profile', handler: () => router.push(`/pharmacist/my-patient/${user.id}`) },
                    // { name: 'Resend Email', handler: () => { } },
                    // { name: 'Remove', handler: () => { } },
                    // { name: 'Flag', handler: () => { } }
                ]} />
            </td>
        </tr>
    ))
}