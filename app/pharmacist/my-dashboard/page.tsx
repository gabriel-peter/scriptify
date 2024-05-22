"use server"
import { selfGetPharmacist } from "@/app/api/pharmacist/get-pharmacist";
import ProfilePhoto from "@/components/data-views/profile-photo";
import AvailabilityDrowndown from "./availability-dropdown";
import { AvailabilityStatus } from "./utils";
import { BasicList } from "@/components/lists/basic-list";
import { getUserOrRedirect } from "@/app/api/user-actions/actions";
import { Suspense } from "react";

export default async function PharmacistDashboard() {
  const user = await getUserOrRedirect()
  return (
    <div className="min-h-screen">
      <div className="container mx-auto mt-8 px-4">

        <Suspense fallback="Loading">
          <MyAvailability userId={user.id} />
        </Suspense>

        <Suspense fallback="Loading">
          <MyPatients userId={user.id} />
        </Suspense>

        Upcoming Appointments 

      </div>
    </div>
  )
}

async function MyAvailability({ userId }: { userId: string }) {
  const getAvailability = async (userId: string) => { return AvailabilityStatus.AVAILABLE };
  const currentAvailability = await getAvailability(userId)
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <AvailabilityDrowndown currentStatus={currentAvailability} />
    </div>
  )
}

async function MyPatients({ userId }: { userId: string }) {
  const { data, error, count } = await selfGetPharmacist(userId);
  if (!data) {
    return <div>no data</div>
  }
  const patients = data.pharmacist_to_patient_match.map(e => e.users)
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2>My Patients ({patients.length})</h2>

      <BasicList
        items={patients}
        actionMenu={[{name: "TODO"}]}
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
    </div>

  )
}
