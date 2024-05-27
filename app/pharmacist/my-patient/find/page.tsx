'use client'

import { useEffect, useState } from "react";
import { getPatientsPaginated, GetPatientsPaginatedFilter, PatientsPaginatedResponse } from "../../../actions/patient/get-patients";
import Paginator, { resetPageIndices } from "@/components/tables/pagination-footer";
import CustomTable from "@/components/tables/standard-table";
import { UsersIcon } from "@heroicons/react/24/solid";
import { stringifyName } from "@/utils/user-attribute-modifiers";
import Link from "next/link";
import SearchBar from "@/components/search/simple-searchbar";
import { states } from "@/app/actions/options";
import ColumnFilter from "@/components/tables/column-filter-dropdown";
import { useRouter } from "next/navigation";
import { TableCell, TableHeader, TableRow } from "@/components/catalyst-ui/table";
import ListActionMenu from "@/components/lists/basic-list-action-menu";
import { Heading } from "@/components/catalyst-ui/heading";
import { Divider } from "@/components/catalyst-ui/divider";

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
    return (<>
    <Heading>Patient Search</Heading>
    <Divider className="my-6"/>
    <SearchBar
                text={queryFilters.nameSearch}
                setText={(e) => setQueryFilters(
                    {
                        ...queryFilters,
                        ...resetPageIndices(PAGE_SIZE),
                        nameSearch: e
                    })}
            />
        <CustomTable
            customStyle="bottom-0"
            // searchBar={}
            // title={"Patient Search"}
            headers={
                <>
                    <TableHeader scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold dark:text-white text-gray-900 sm:pl-0">
                        Full Name
                    </TableHeader>
                    <TableHeader scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold dark:text-white text-gray-900">
                        Email
                    </TableHeader>
                    <TableHeader scope="col" className="px-4 py-3.5 text-left text-sm font-semibold dark:text-white text-gray-900">
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
                    </TableHeader>
                    <TableHeader scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-0">
                        Actions
                    </TableHeader>
                </>
            }
        >
            {/* <Suspense fallback={<p>"Loading Users..."</p>}> */}
            <TableContent patients={patients} />
            {/* </Suspense> */}
        </CustomTable>
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
        <TableRow key={indx}>
            <TableCell className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium dark:text-white text-gray-900 sm:pl-0">
                <Link
                    href={`/admin/patient/${user.id}`}
                    className="hover:underline"
                >
                    {stringifyName(user.profiles!)}
                </Link>
            </TableCell>
            <TableCell className="whitespace-nowrap p-4 text-sm text-gray-500">
                {user.email}
            </TableCell>
            <TableCell className="whitespace-nowrap p-4 text-sm text-gray-500">
                {user.profiles?.state_enum}
            </TableCell>
            <TableCell className="whitespace-nowrap py-4 pl-4 pr-4 text-sm dark:text-white text-gray-500 sm:pr-0">
                <ListActionMenu actions={[
                    { name: 'View Profile', methodCall: () => router.push(`/pharmacist/my-patient/${user.id}`) },
                ]} />
            </TableCell>
        </TableRow>
    ))
}