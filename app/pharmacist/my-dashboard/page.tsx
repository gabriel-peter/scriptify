"use server"
import { selfGetPharmacist } from "@/app/actions/pharmacist/get-pharmacist";
import ProfilePhoto from "@/components/data-views/profile-photo";
import AvailabilityDrowndown from "./availability-dropdown";
import { AvailabilityStatus } from "../../actions/utils";
import { BasicList_Server } from "@/components/lists/basic-list-server";
import { getUserProfileOrRedirect } from "@/app/actions/user/get";
import { Suspense } from "react";
import PaddedContainer from "@/components/containers/padded-container";
import { SectionHeadingWithAction } from "@/components/lists/basic-list-section-header";
import { Route } from "next";
import PageContainer from "@/components/containers/page-container";
import { stringifyName } from "@/utils/user-attribute-modifiers";
import { standardButtonStyling } from "@/components/forms/styling";
import { createClient } from "@/utils/supabase/server";
import { toHumanReadableDate } from "@/utils/time";
import { Heading } from "@/components/catalyst-ui/heading";

export default async function PharmacistDashboard() {
  const { user, profile } = await getUserProfileOrRedirect()
  return (
    <PageContainer>
      <Heading>Welcome <strong>{stringifyName(profile)}</strong></Heading>

      <Suspense fallback="Loading">
        <MyAvailability userId={user.id} />
      </Suspense>

      <Suspense fallback="Loading">
        <MyPatients userId={user.id} />
      </Suspense>

      <Suspense>
        <MyAppointments userId={user.id} />
      </Suspense>

    </PageContainer>
  )
}

async function MyAppointments({ userId }: { userId: string }) {
  const { error, data, count } = await createClient().from('appointments')
    .select('*, users!appointments_patient_id_fkey(*, profiles!inner(*))')
    .eq('pharmacist_id', userId)
    .gte('start_time', new Date().toISOString())
    .limit(5)

  return (
    <PaddedContainer>
      <SectionHeadingWithAction title={`Upcoming Appointments (${data?.length})`} actionHref={"/pharmacist/appointments"} actionTitle={"View All Appointments"} />
      <BasicList_Server 
      items={data} 
      actionBuilder={
        (patient) => {
          return (
            [
              { name: "Cancel Appointment", href: 'todo' }
            ]
          )
        }
      }
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
      )} />
    </PaddedContainer>
  )

}

async function MyAvailability({ userId }: { userId: string }) {
  const getAvailability = async (userId: string) => { return AvailabilityStatus.AVAILABLE };
  const currentAvailability = await getAvailability(userId)
  return (
    <PaddedContainer>
      <AvailabilityDrowndown currentStatus={currentAvailability} />
    </PaddedContainer>
  )
}

async function MyPatients({ userId }: { userId: string }) {
  const { data, error, count } = await selfGetPharmacist(userId);
  if (!data) {
    return <div>no data</div>
  }
  const patients = data.pharmacist_to_patient_match.map(e => e.users)
  const scheduleAppointmentUrl = (userId: string): Route<string> => {
    const searchParams = new URLSearchParams({
      'userId': userId
    })
    console.log(searchParams.toString())
    return '/pharmacist/appointment/new?' + searchParams.toString() as Route
  }

  return (
    <PaddedContainer>
      {/* <div className="flex justify-between">
        <h2>My Patients ({patients.length})</h2>
        {patients.length === 0 &&
          <button
            className={standardButtonStyling}
          // onClick={() => console.log('TODO open patient finder')}
          >
            Find Patients
          </button>}
      </div> */}
      <SectionHeadingWithAction title={`My Patients (${patients.length})`} actionHref={"/pharmacist/my-patient/find"} actionTitle={"Find new patients"} />
      <BasicList_Server
        items={patients}
        actionBuilder={
          (patient) => {
            return (
              [
                { name: "Schedule an appointment", href: scheduleAppointmentUrl(patient?.id) },
                { name: "View Profile", href: `/pharmacist/my-patient/${patient?.id}` }
              ]
            )
          }
        }
        row={(patient) => (
          <>
            <div className="flex min-w-0 gap-x-4">
              <ProfilePhoto size={40} userId={patient.id} />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">{patient.profiles.first_name + " " + patient.profiles.last_name}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{patient.email}</p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              {/* <p className="text-sm leading-6 text-gray-900">{'TODO'}</p> */}
              {/* {person.lastSeen ? (
    <p className="mt-1 text-xs leading-5 text-gray-500">
      Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
    </p>
  ) : (
    <div className="mt-1 flex items-center gap-x-1.5">
      <div className="flex-none rounded-full bg-emerald-500/20 p-1">
        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
      </div>
      <p className="text-xs leading-5 text-gray-500">Online</p>
    </div>
  )} */}
            </div>
          </>
        )}
      />
    </PaddedContainer>

  )
}
