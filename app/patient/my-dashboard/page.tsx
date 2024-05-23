"use server"
import { Tables } from "@/types_db";
import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";
import { Suspense } from 'react'
import { stringifyName } from "@/utils/user-attribute-modifiers";
import { getUserDemographicInformationCurrentUser } from "@/app/api/user-actions/actions";
import { MyTransfers } from "@/components/data-views/transfer_requests/table-view";
import { BasicList_Server } from "@/components/lists/basic-list-server";
import ProfilePhoto from "@/components/data-views/profile-photo";
import { SectionHeadingWithAction } from "@/components/lists/basic-list-section-header";
import PaddedContainer from "@/components/containers/padded-container";

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
        <h2 className="text-xl font-semibold mb-4">Welcome, {stringifyName(userInfo)}</h2>

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
          <MyAppointments />
        </Suspense>
      </div>
    </div>
  );
}

async function MyAppointments() {
  return (
    <PaddedContainer>
      <SectionHeadingWithAction title="Upcoming Appointments" actionHref="/appointment/new" actionTitle="Request an appointment" />
      <BasicList_Server
        items={['Appointment 1', 'Appointment 2', 'Appointment 3']}
        row={(row) => (<p>{row}</p>)}
        actionBuilder={[{ name: 'Cancel', href: '#' }]}
      />
    </PaddedContainer>
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
        actionBuilder={[{ name: "Request New Pharmacist", href: "#" }]}
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