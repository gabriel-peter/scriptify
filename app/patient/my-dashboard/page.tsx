"use server"
import { Tables } from "@/types_db";
import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";
import { Suspense } from 'react'
import { stringifyName } from "@/utils/user-attribute-modifiers";
import { getUserDemographicInformationCurrentUser } from "@/app/actions/user/get";
import { MyTransfers } from "@/components/data-views/transfer_requests/table-view";
import { BasicList_Server } from "@/components/lists/basic-list-server";
import ProfilePhoto from "@/components/data-views/profile-photo";
import { SectionHeadingWithAction } from "@/components/lists/basic-list-section-header";
import PaddedContainer from "@/components/containers/padded-container";
import { toHumanReadableDate } from "@/utils/time";

export default async function Dashboard() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return <div>NO USER :(</div>
  }
  const result = await getUserDemographicInformationCurrentUser();
  if (!result || result.error) {
    return <>ERROR</>
  }
  return <PharmaceuticalPatientDashboard user={user} userInfo={result.data} />
}

function PharmaceuticalPatientDashboard({
  user,
  userInfo,
}: {
  user: User,
  userInfo: Tables<"profiles">,
}) {
  return (
    <div className="min-h-screen">

      {/* Main Content */}
      <div className="container mx-auto mt-8 px-4">
        <h2 className="text-xl font-semibold mb-4 mb-5">Welcome, {stringifyName(userInfo)}</h2>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <NextAppointment appointment={{
            doctor: "Dr. Michael Peter",
            date: "March 5, 2024",
            time: "9:30 am"
          }}
          />
        </div>

        {/* My Pharmacists */}
        <Suspense fallback="Loading">
          <MyPharmacist userId={user.id} />
        </Suspense>

        {/* Transfers */}
        <Suspense fallback="Loading">
          <MyTransfers userId={user.id} />
        </Suspense>

        {/* Appointments */}
        <Suspense fallback="Loading">
          <MyAppointments userId={user.id} />
        </Suspense>
      </div>
    </div>
  );
}

export async function MyAppointments({userId}: {userId: string}) {
  const {data, error} = await createClient().from('appointments')
  .select('*, users!appointments_pharmacist_id_fkey(*, profiles!inner(*))')
  .eq('patient_id', userId)
  .gte('start_time', new Date().toISOString()) // TODO this will be server localized...
  .limit(5);

  return (
    <PaddedContainer>
      <SectionHeadingWithAction title={`Upcoming Appointments (${data?.length || 0})`} actionHref="/appointment/new" actionTitle="Request an appointment" />
      {data ? 
      <BasicList_Server
        items={data}
        row={(appointment) => (
          <>
          <div className="flex min-w-0 gap-x-4">
            <ProfilePhoto size={40} userId={appointment.users.id} />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">{appointment.users.profiles.first_name + " " + appointment.users.profiles.last_name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{appointment.users.email}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="mt-1 text-xs leading-5 text-gray-500">
              {' '}
              <time dateTime={appointment.start_time}>{toHumanReadableDate({ month: "long", "day": "numeric", hour: 'numeric', minute: 'numeric' }, appointment.start_time, true)}</time>
              {' '}
              -
              {' '}
              <time dateTime={appointment.end_time}>{toHumanReadableDate({ month: "long", "day": "numeric", hour: 'numeric', minute: 'numeric' }, appointment.end_time, true)}</time>
            </p>
          </div>
        </>
        )}
        actionBuilder={(row) => [{ name: 'Cancel', href: '#' }]}
      /> : 
      "No Upcoming Appointments"
}
    </PaddedContainer>
  )
}

export async function MyPharmacist({ userId }: { userId: string }) {
  const supabase = createClient()
  const { data, error, count } = await supabase.from('pharmacist_to_patient_match')
    .select(`*, users!pharmacist_to_patient_match_pharmacist_id_fkey(*, profiles!inner(*))`)
    .eq('patient_id', userId)
  console.log(data, error)
  const pharmacists = data;
  if (!pharmacists || pharmacists.length === 0) {
    return <PaddedContainer>
    <h2>My Pharmacist</h2>
    <p className="mt-6 text-base leading-7 text-gray-600">We are currently matching you with a pharmacist</p>
    </PaddedContainer>
  }

  return (
    <PaddedContainer>
      <h2>My Pharmacist(s)</h2>
      <BasicList_Server items={pharmacists} row={
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
        actionBuilder={(row) => [{ name: "Request New Pharmacist", href: "#" }]}
      />
    </PaddedContainer>
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