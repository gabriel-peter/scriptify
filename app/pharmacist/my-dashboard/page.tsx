"use server"
import { selfGetPharmacist } from "@/app/api/pharmacist/get-pharmacist";
import LazyProfilePhoto from "@/components/data-views/lazy-profile-photo";
import ProfilePhoto from "@/components/data-views/profile-photo";

export default async function PharmacistDashboard() {
    const result = await selfGetPharmacist();
    console.log(result)
    console.log(result.data.pharmacist_to_patient_match)
    return (
        <>
        <ul role="list" className="space-y-3">
          <li className="overflow-hidden bg-white px-4 py-4 shadow sm:rounded-md sm:px-6">
            <h2>My Patients</h2>
          <PatientList people={result.data.pharmacist_to_patient_match.map(e => e.users)}/>

          </li>
          <li className="overflow-hidden bg-white px-4 py-4 shadow sm:rounded-md sm:px-6">
            Upcoming Appointments
          </li>
      </ul>
      </>
    )
}

function PatientList({people}: { people : {email: string, id:string, profiles: { avatar_url: string, first_name: string, last_name: string, state_enum: string}}[]}) {
    return (
      <ul role="list" className="divide-y divide-gray-100">
        {people.map((person) => (
          <li key={person.email} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <ProfilePhoto size={40} userId={person.id}  />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{person.profiles.first_name + " " + person.profiles.last_name}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{'TODO'}</p>
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
          </li>
        ))}
      </ul>
    )
  }
  