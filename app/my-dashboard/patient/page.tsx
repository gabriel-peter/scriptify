"use server"
import { Database, Tables } from "@/types_db";
import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { cn } from "@/utils/cn";

export default async function Dashboard() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return <div>NO USER :(</div>
  }
  const transfers = await getUserTransfers(supabase, user.id);
  console.log("TRANSFERS", transfers);
 return <PharmaceuticalPatientDashboard prescriptionTransfers={transfers}/>
}

async function getUserTransfers(supabase: SupabaseClient<Database>, userId: string) {
  const {data, error, status} = await supabase.from("transfer_requests").select("*").eq("user_id", userId);
  return data;
}

function PharmaceuticalPatientDashboard({prescriptionTransfers}: {prescriptionTransfers: Tables<'transfer_requests'>[] | null}) {
    return (
      <div className="bg-gray-100 min-h-screen">

        {/* Main Content */}
        <div className="container mx-auto mt-8 px-4">
          <h2 className="text-xl font-semibold mb-4">Welcome, John Doe</h2>
  
          {/* Patient Information */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold mb-2">Patient Information</h3>
            <p className="text-gray-600">Age: 35</p>
            <p className="text-gray-600">Gender: Male</p>
            <p className="text-gray-600">Address: 123 Main St, City</p>
            <p className="text-gray-600">Phone: +1234567890</p>
          </div>

          <NextAppointment appointment={{
            doctor: "Dr. Michael Peter",
            date: "March 5, 2024",
            time: "9:30 am"
          }}
          />
  
          {/* Medications */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Transfers in Progress</h3>
            {prescriptionTransfers && <TranfserRequestView prescriptionTransfers={prescriptionTransfers}/>}
          </div>
  
          {/* Appointments */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Appointments</h3>
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



const statuses = {
  complete: 'text-green-700 bg-green-50 ring-green-600/20',
  pending: 'text-gray-600 bg-gray-50 ring-gray-500/10',
  "pharmacist-filled": 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
}


function TranfserRequestView({prescriptionTransfers}: {prescriptionTransfers: Tables<'transfer_requests'>[]}) {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {prescriptionTransfers?.map((request, indx) => (
        <li key={indx} className="flex items-center justify-between gap-x-6 py-5">
          <div className="min-w-0">
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
                Due on <time 
                // dateTime={request.created_at}
                >{request.created_at}</time>
              </p>
              <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                <circle cx={1} cy={1} r={1} />
              </svg>
              <p className="truncate">Pharmacy Email {request.pharmacy_email}</p>
            </div>
          </div>
          {/* <div className="flex flex-none items-center gap-x-4"> TODO these needs to be migrated to client component to work
            <a
              // href={project.href}
              className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
            >
              View project<span className="sr-only">, {}</span>
            </a>
            <Menu as="div" className="relative flex-none">
              <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                <span className="sr-only">Open options</span>
                <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={cn(
                          active ? 'bg-gray-50' : '',
                          'block px-3 py-1 text-sm leading-6 text-gray-900'
                        )}
                      >
                        Edit<span className="sr-only">, {}</span>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={cn(
                          active ? 'bg-gray-50' : '',
                          'block px-3 py-1 text-sm leading-6 text-gray-900'
                        )}
                      >
                        Move<span className="sr-only">, {}</span>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={cn(
                          active ? 'bg-gray-50' : '',
                          'block px-3 py-1 text-sm leading-6 text-gray-900'
                        )}
                      >
                        Delete<span className="sr-only">, {}</span>
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div> */}
        </li>
      ))}
    </ul>
  )
}


  function NextAppointment({ appointment }: {appointment: any}) {
    // Assuming appointment is an object with properties like date, time, doctor, etc.
    // If appointment is null, it means no upcoming appointment.
  
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
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
      </div>
    );
  }