"use server"
import { BasicList_Server } from "@/components/lists/basic-list-server";
import { SectionHeadingWithAction } from "@/components/lists/basic-list-section-header";
import { cn } from "@/utils/cn";
import { createClient } from "@/utils/supabase/server";
import { toHumanReadableTime } from "@/utils/time";
import Link from "next/link";
import PaddedContainer from "@/components/containers/padded-container";
import { Heading, Subheading } from "@/components/catalyst-ui/heading";
import { Text } from "@/components/catalyst-ui/text";

const statuses = {
  complete: 'text-green-700 bg-green-50 ring-green-600/20',
  pending: 'text-gray-600 bg-gray-50 ring-gray-500/10',
  "pharmacist-filled": 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
}

export async function MyTransfers({ userId }: { userId: string }) {
  const { data, error, count } = await createClient().from("transfer_requests").select("*").eq("user_id", userId);
  if (!data) {
    return <div></div>
  }
  const prescriptionTransfers = data;
  return (
    <PaddedContainer>
      {/* Header */}
      <SectionHeadingWithAction title="Transfers in Progress" actionHref="/patient/transfer/new" actionTitle="Make new request" />

      {/* List */}
      <BasicList_Server
        items={prescriptionTransfers}
        row={(request) => {
          return (
            <>
              <div className="flex items-start gap-x-3">
                <Link
                  className="hover:underline"
                  href={"#"}
                >
                  <Subheading level={2}>
                  {/* // className="text-sm font-semibold leading-6 text-gray-900"> */}
                  {request.pharmacy_name}
                  </Subheading>
                </Link>
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
                <Text className="whitespace-nowrap">
                  Submitted on <time
                    dateTime={request.created_at!}
                  >{toHumanReadableTime(request.created_at!, true)}</time>
                </Text>
                <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                  <circle cx={1} cy={1} r={1} />
                </svg>
                <Text>Pharmacy Email {request.pharmacy_email}</Text>
              </div>
            </>
          )
        }}
      />
    </PaddedContainer>
  )
}