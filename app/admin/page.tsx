"use client"

import AdminUserList from "@/app/admin/user-list";
import { getUsersPaginated, GetUsersPaginatedFilter, UserProfileResponse } from "./actions";
import { Suspense, useEffect, useState } from "react";
import Paginator, { resetPageIndices } from "@/components/tables/pagination-footer";
import SearchBar from "@/components/search/simple-searchbar";
import Table from "@/components/tables/standard-table";
import { ACCOUNT_TYPE } from "@/utils/enums";
import ColumnFilter from "@/components/tables/column-filter-dropdown";
import { stringifyName } from "@/utils/user-attribute-modifiers";
import { ActionDropDown } from "@/components/tables/action-dropdown";
import Link from "next/link";
import { UsersIcon } from "@heroicons/react/24/solid";

export default function AdminHomePage() {
    const PAGE_SIZE = 15;
    const [users, setUsers] = useState<UserProfileResponse>();
    const [queryFilters, setQueryFilters] = useState<GetUsersPaginatedFilter>({
        toIndex: 0,
        fromIndex: PAGE_SIZE
    });
    const [count, setCount] = useState<number | null>(null);
    useEffect(() => {
        getUsersPaginated(queryFilters).then((result) => { setUsers(result); setCount(result.count) })
    }, [queryFilters, setQueryFilters, count, setCount])
    return (
        <>
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
                title={"User Search"}
                headers={[
                    <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                        Full Name
                    </th>,
                    <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900">
                        Email
                    </th>,
                    <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                        <ColumnFilter columnName="Account Tpye" filterHandlers={
                            (['PHARMACIST', 'ADMIN', 'PATIENT', undefined] as ACCOUNT_TYPE[]).map((value) => {
                                return {
                                    name: value ? value : "Clear",
                                    setFilter: () => setQueryFilters(
                                        {
                                            ...queryFilters,
                                            ...resetPageIndices(PAGE_SIZE),
                                            accountTypeFilter: value
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
                <TableContent users={users} />
                {/* </Suspense> */}
            </Table>
            <Paginator
                resultCount={count || 0}
                queryFilters={queryFilters}
                setQueryFilters={setQueryFilters}
                pageSize={PAGE_SIZE} />
        </>
    )
}


function TableContent({ users }: { users: UserProfileResponse | undefined }) {
    // const users = await getUsersPaginated(queryFilters)
    // .then((users) => {setCount(users.count); return users});
    if (!users || !users.data) {
        return <></>
    }
    if (users.data.length === 0) {
        return (<div className="px-6 py-14 text-center text-sm sm:px-14">
        <UsersIcon className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
        <p className="mt-4 font-semibold text-gray-900">No people found</p>
        <p className="mt-2 text-gray-500">
            We couldn’t find anything with that term. Please try again.
        </p>
    </div>)
    }
    return users.data.map((user, indx) => (
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
                {user.account_type?.toString()}
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-0">
                <ActionDropDown actions={[
                    { name: 'See Transfers', handler: () => { } },
                    { name: 'Resend Email', handler: () => { } },
                    { name: 'Remove', handler: () => { } },
                    { name: 'Flag', handler: () => { } }
                ]} />
            </td>
        </tr>
    ))
}
