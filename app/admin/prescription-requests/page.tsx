"use client"
import Table from "@/components/tables/standard-table";
import { AllTransferRequestsResponse, GetTransferedRequestsFilters, getTransferedPrescriptions } from "./get-prescription-transfers"
import { Suspense, useEffect, useState } from "react";
import { toHumanReadableDate } from "@/utils/time";
import { cn } from "@/utils/cn";
import { Database } from "@/types_db";
import { stringifyName } from "@/utils/user-attribute-modifiers";
import Paginator from "@/components/tables/pagination-footer";

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
            <Table
                title={"Prescription Transfers"}
                headers={[
                    <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                        Pharmacy Name
                    </th>,
                    <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900">
                        Patient Name
                    </th>,
                    <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Pharmacy Email
                    </th>,
                    <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Status
                    </th>,
                    <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-0">
                        Last Updated
                    </th>
                ]}
                // actionButton={
                // <button
                //     type="button"
                //     className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                // >
                //     Add user
                // </button>
                // }
                description="Test"
            >
                {transfers.map((transfer, indx) => (
                    <tr key={indx} className="divide-x divide-gray-200">
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
                            {transfer.pharmacy_name}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-900">
                            {stringifyName(transfer.profiles)}
                        </td>
                        <td className="whitespace-nowrap p-4 text-sm text-gray-500">{transfer.pharmacy_email}</td>
                        <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                            <span className={cn(
                                getRequestStatusStyling(transfer.request_status),
                                "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium  ring-1 ring-inset"
                            )}>

                                {transfer.request_status}
                            </span>
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-0">{
                            toHumanReadableDate({
                                weekday: "short",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                // second: "numeric",
                                // timeZoneName: "short",
                            }, transfer.updated_at || "ERROR")
                        }</td>
                    </tr>
                ))}
            </Table>
            <Paginator
                pageSize={PAGE_SIZE}
                resultCount={totalCount || 0}
                queryFilters={queryFilters}
                setQueryFilters={setQueryFilters}
            />
        </>
    )
}