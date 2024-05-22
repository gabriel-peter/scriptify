"use server"
import { BasicList } from "@/components/lists/basic-list";
import { cn } from "@/utils/cn";
import { createClient } from "@/utils/supabase/server";
import { toHumanReadableTime } from "@/utils/time";
import Link from "next/link";

const statuses = {
  complete: 'text-green-700 bg-green-50 ring-green-600/20',
  pending: 'text-gray-600 bg-gray-50 ring-gray-500/10',
  "pharmacist-filled": 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
}

export async function TranfserRequestView({ userId }: { userId: string }) {
  const { data, error, count } = await createClient().from("transfer_requests").select("*").eq("user_id", userId);
  if (!data) {
    return <div></div>
  }
  const prescriptionTransfers = data;
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">

      <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
        <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
          {/* <div className="ml-4 mt-2"> */}
          <h3 className="text-lg font-semibold mb-4">Transfers in Progress</h3>
          {/* </div> */}
          <div className="flex-shrink-0">
            <Link
              href={"/patient/transfer/new"}
              className="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Make new request
            </Link>
          </div>
        </div>
      </div>
      <BasicList
        items={prescriptionTransfers}
        row={(request) => {
          return (
            <>
              <div className="flex items-start gap-x-3">
                <p className="text-sm font-semibold leading-6 text-gray-900">{request.pharmacy_name}</p>
                <p
                  className={cn(
                    statuses[request.request_status || "pending"],
                    'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
                  )}
                >
                  {request.request_status}
                </p>
              </div>
              <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                <p className="whitespace-nowrap">
                  Submitted on <time
                    dateTime={request.created_at!}
                  >{toHumanReadableTime(request.created_at!, true)}</time>
                </p>
                <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                  <circle cx={1} cy={1} r={1} />
                </svg>
                <p className="truncate">Pharmacy Email {request.pharmacy_email}</p>
              </div>
            </>)
        }}
      />
    </div>
  )
}