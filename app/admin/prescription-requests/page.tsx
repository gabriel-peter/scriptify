"use client"
import CustomTable from "@/components/tables/standard-table";
import { AllTransferRequestsResponse, GetTransferedRequestsFilters, getTransferedPrescriptions } from "../../actions/transfer-requests/get-prescription-transfers"
import { Suspense, useEffect, useState } from "react";
import { toHumanReadableDate } from "@/utils/time";
import { cn } from "@/utils/cn";
import { Database } from "@/types_db";
import { stringifyName } from "@/utils/user-attribute-modifiers";
import Paginator, { resetPageIndices } from "@/components/tables/pagination-footer";
import SearchBar from "@/components/search/simple-searchbar";
import ColumnFilter from "@/components/tables/column-filter-dropdown";
import { PaginationFilters } from "@/utils/supabase/types";
import Link from "next/link";
import { TableCell, TableHead, TableHeader, TableRow } from "@/components/catalyst-ui/table";
import ListActionMenu from "@/components/lists/basic-list-action-menu";

function getRequestStatusStyling(requestStatus: Database['public']['Enums']['transfer_request_status']) {
    const colorMap = () => {
        switch (requestStatus) {
            case "pending": return "gray"
            case "pharmacist-filled": return "yellow"
            case "complete": return "green"
            default: return "blue"
        }
    }
    const color = colorMap();
    return `bg-${color}-50 text-${color}-700 ring-${color}-600/20`
}

export default function PrescriptionRequestPage() {
    const PAGE_SIZE = 10
    const [transfers, setTransfers] = useState<AllTransferRequestsResponse['data'] | null>(null)
    const [totalCount, setTotalCount] = useState<number | null>(0);
    const [queryFilters, setQueryFilters] = useState<GetTransferedRequestsFilters>({
        statusFilter: "pending",
        toIndex: 0,
        fromIndex: PAGE_SIZE
    });
    useEffect(() => {
        getTransferedPrescriptions(queryFilters).then(({ error, data, count }) => {
            if (error) { console.log(error) }
            else { setTransfers(data); setTotalCount(count); }
        })
    }, [queryFilters, setQueryFilters, totalCount, setTotalCount])
    if (!transfers) {
        return "Loading"
    }
    return (
        <>
            <CustomTable
                title={"Prescription Transfers"}
                headers={[
                    <TableHeader scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                        Pharmacy Name
                    </TableHeader>,
                    <TableHeader scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900">
                        Patient Name
                    </TableHeader>,
                    <TableHeader scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Pharmacy Email
                    </TableHeader>,
                    <TableHeader scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                        <ColumnFilter columnName="Status" filterHandlers={
                            (['pending', 'pharmacist-filled', 'complete', undefined] as Database['public']['Enums']['transfer_request_status'][]).map((value) => {
                                return {
                                    name: value ? value : "Clear",
                                    setFilter: () => setQueryFilters({ ...queryFilters, ...resetPageIndices(PAGE_SIZE), statusFilter: value })
                                }
                            })
                        } />
                    </TableHeader>,
                    <TableHeader scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900">
                        Last Updated
                    </TableHeader>,
                    <TableHeader className="relative w-0">
                    <span className="sr-only">Actions</span>
                  </TableHeader>
                ]}
                searchBar={
                    <SearchBar text={queryFilters.patientNameSearch} setText={(value) => setQueryFilters({ ...queryFilters, ...resetPageIndices(PAGE_SIZE), patientNameSearch: value })} />
                }
                // actionButton={
                // <button
                //     type="button"
                //     className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                // >
                //     Add user
                // </button>
                // }
                description="Look-up prescription tranfers, filter by status & search by patient first name."
            >
                {transfers.map((transfer, indx) => (
                    <TableRow key={indx} className="divide-x divide-gray-200">
                        <TableCell className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
                            {transfer.pharmacy_name}
                        </TableCell>
                        <TableCell className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-900">
                            <Link
                                href={`/admin/patient/${transfer.users.id}`}
                                className="hover:underline"
                            >
                                {stringifyName(transfer.users.profiles)}
                            </Link>
                        </TableCell>
                        <TableCell className="whitespace-nowrap p-4 text-sm text-gray-500">{transfer.pharmacy_email}</TableCell>
                        <TableCell className="whitespace-nowrap p-4 text-sm text-gray-500">
                            <span className={cn(
                                getRequestStatusStyling(transfer.request_status!),
                                "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium  ring-1 ring-inset"
                            )}>

                                {transfer.request_status}
                            </span>
                        </TableCell>
                        <TableCell className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-0">{
                            toHumanReadableDate({
                                weekday: "short",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                            }, transfer.updated_at || "ERROR")
                        }</TableCell>
                        <TableCell className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-0">
                        <ListActionMenu actions={[
                            {name: 'Inspect', href:'/TODO'}
                        ]} />
                        </TableCell>
                    </TableRow>
                ))}
            </CustomTable>
            <Paginator
                pageSize={PAGE_SIZE}
                resultCount={totalCount || 0}
                queryFilters={queryFilters}
                setQueryFilters={setQueryFilters}
            />
        </>
    )
}
