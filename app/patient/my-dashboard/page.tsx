"use server"
import { Database, Tables } from "@/types_db";
import { createClient } from "@/utils/supabase/server";
import { SupabaseClient, User } from "@supabase/supabase-js";
import { Fragment, ReactNode, Suspense } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { cn } from "@/utils/cn";
import { toHumanReadableTime } from "@/utils/time";
import { stringifyAddress, stringifyName } from "@/utils/user-attribute-modifiers";
import Link from "next/link";
import { getUserDemographicInformationCurrentUser } from "@/app/api/user-actions/actions";
import { Route } from "next";
import { TranfserRequestView } from "@/components/data-views/transfer_requests/table-view";
import { BasicList } from "@/components/lists/basic-list";
import ProfilePhoto from "@/components/data-views/profile-photo";

export default async function Dashboard() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return <div>NO USER :(</div>
  }
  // const transfers = await getUserTransfers(supabase, user.id);
  const result = await getUserDemographicInformationCurrentUser();
  if (!result || result.error) {
    return <>ERROR</>
  }
  // console.debug("TRANSFERS", transfers);
  return <PharmaceuticalPatientDashboard user={user} userInfo={result.data} />
}

// async function getUserTransfers(supabase: SupabaseClient<Database>, userId: string) {
//   const { data, error, status } = await supabase.from("transfer_requests").select("*").eq("user_id", userId);
//   return data;
// }


function PharmaceuticalPatientDashboard({
  user,
  userInfo,
  // prescriptionTransfers
}: {
  user: User,
  userInfo: Tables<"profiles">,
  // prescriptionTransfers: Tables<'transfer_requests'>[] | null
}) {
  return (
    <div className="min-h-screen">

      {/* Main Content */}
      <div className="container mx-auto mt-8 px-4">
        <h2 className="text-xl font-semibold mb-4">Welcome, {stringifyName(userInfo)}</h2>

        {/* <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold mb-2">Patient Information</h3>
          <p className="text-gray-600">Age: {computeAge(userInfo.date_of_birth)}</p>
          <p className="text-gray-600">Gender: Male</p>
          <p className="text-gray-600">Address: {stringifyAddress(userInfo)}</p>
          <p className="text-gray-600">Phone: +1234567890</p>
        </div> */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <NextAppointment appointment={{
            doctor: "Dr. Michael Peter",
            date: "March 5, 2024",
            time: "9:30 am"
          }}
          />
        </div>

        <Suspense fallback="Loading">
          <MyPharmacist userId={user.id} />
        </Suspense>

        {/* Medications */}
        {/* <div className="bg-white rounded-lg shadow-md p-6 mb-8"> */}
        {/* <SectionHeadingWithAction title="Transfers in Progress" actionHref="/patient/transfer/new" actionTitle="Make new request" /> */}
        <Suspense fallback="Loading">
          <TranfserRequestView userId={user.id} />
        </Suspense>
        {/* </div> */}

        {/* Appointments */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <SectionHeadingWithAction title="Upcoming Appointments" actionHref="/appointment/new" actionTitle="Request an appointment" />
          <ul>
            <li className="text-gray-800 mb-2">Appointment 1</li>
            <li className="text-gray-800 mb-2">Appointment 2</li>
            <li className="text-gray-800 mb-2">Appointment 3</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function SectionHeadingWithAction({ title, actionHref, actionTitle }: { title: string, actionHref: Route<string>, actionTitle: string }) {
  return (
    <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
        {/* <div className="ml-4 mt-2"> */}
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        {/* </div> */}
        <div className="flex-shrink-0">
          <Link
            href={actionHref}
            className="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            {actionTitle}
          </Link>
        </div>
      </div>
    </div>
  )
}

async function MyPharmacist({ userId }: { userId: string }) {
  const supabase = createClient()
  const { data, error, count } = await supabase.from('pharmacist_to_patient_match')
    .select(`*, users!pharmacist_to_patient_match_pharmacist_id_fkey(*, profiles!inner(*))`)
    .eq('patient_id', userId)
  console.log(data, error)
  const pharmacists = data;
  if (!pharmacists || pharmacists.length === 0) {
    return <></>
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2>My Pharmacist(s)</h2>
      <BasicList items={pharmacists} row={
        (x) => {
          return (
            <>
              <div className="flex items-start gap-x-3">
                <ProfilePhoto userId={x.users?.profiles?.avatar_url} size={30} />
                <p className="text-sm font-semibold leading-6 text-gray-900">{stringifyName(x.users?.profiles)}</p>
              </div>
              <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                {/* <p className="whitespace-nowrap">
                Submitted on <time
                  dateTime={request.created_at!}
                >{toHumanReadableTime(request.created_at!, true)}</time>
              </p>
              <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                <circle cx={1} cy={1} r={1} />
              </svg>
              <p className="truncate">Pharmacy Email {request.pharmacy_email}</p> */}
              </div>
            </>
          )
        }
      }
        actionMenu={[{ name: "Request New Pharmacist", href: "#" }]}
      />
    </div>
  )

}

function NextAppointment({ appointment }: { appointment: any }) {
  // Assuming appointment is an object with properties like date, time, doctor, etc.
  // If appointment is null, it means no upcoming appointment.

  return (
    <>
      <h2 className="text-lg font-semibold mb-4">Next Appointment</h2>
      {appointment ? (
        <div>
          <p className="text-gray-600 font-medium">Date:</p>
          <p className="text-gray-800">{appointment.date}</p>
          <p className="text-gray-600 font-medium">Time:</p>
          <p className="text-gray-800">{appointment.time}</p>
          <p className="text-gray-600 font-medium">Doctor:</p>
          <p className="text-gray-800">{appointment.doctor}</p>
          {/* Add more appointment details as needed */}
        </div>
      ) : (
        <p className="text-gray-600">You have no upcoming appointments.</p>
      )}
    </>
  );
}