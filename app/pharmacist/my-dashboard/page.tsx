"use server"
import { selfGetPharmacist } from "@/app/api/pharmacist/get-pharmacist";
import ProfilePhoto from "@/components/data-views/profile-photo";
import AvailabilityDrowndown from "./availability-dropdown";
import { AvailabilityStatus } from "./utils";
import { BasicList } from "@/components/lists/basic-list";
import { getUserProfileOrRedirect } from "@/app/api/user-actions/actions";
import { Suspense } from "react";
import PaddedContainer from "@/components/containers/padded-container";
import { SectionHeadingWithAction } from "@/components/lists/basic-list-section-header";
import { Route } from "next";
import PageContainer from "@/components/containers/page-container";
import { stringifyName } from "@/utils/user-attribute-modifiers";
import { standardButtonStyling } from "@/components/forms/styling";

export default async function PharmacistDashboard() {
  const { user, profile } = await getUserProfileOrRedirect()
  return (
    <PageContainer>
      <h2>Welcome <strong>{stringifyName(profile)}</strong></h2>

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
  return (
    <PaddedContainer>
      <SectionHeadingWithAction title='Upcoming Appointments' actionHref={"/pharmacist/appointments"} actionTitle={"View All Appointments"} />
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
      <div className="flex justify-between">
      <h2>My Patients ({patients.length})</h2>
      {patients.length === 0 && 
      <button 
      className={standardButtonStyling}
      // onClick={() => console.log('TODO open patient finder')}
      >
        Find Patients
        </button> }
      </div>
      <BasicList
        items={patients}
        actionBuilder={
          (patient) => {
            return (
              [
                { name: "Schedule an appointment", href: scheduleAppointmentUrl(patient?.id) }
              ]
            )
          }
        }
        row={(patient) => (
          <>
            <div className="flex min-w-0 gap-x-4">
              <ProfilePhoto size={40} userId={patient.id} />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{patient.profiles.first_name + " " + patient.profiles.last_name}</p>
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
