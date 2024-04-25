"use server"

import { createClient } from "@/utils/supabase/server";

export default async function Dashboard() {
  const supabase = createClient()
 return <PharmaceuticalPatientDashboard/>
}


function TransferRequests() {
  return (
    <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="ml-4 mt-4">
          <h3 className="text-base font-semibold leading-6 text-gray-900">Job Postings</h3>
          <p className="mt-1 text-sm text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit quam corrupti consectetur.
          </p>
        </div>
        <div className="ml-4 mt-4 flex-shrink-0">
          <button
            type="button"
            className="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create new job
          </button>
        </div>
      </div>
    </div>
  )
}


function PharmaceuticalPatientDashboard() {
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
            <h3 className="text-lg font-semibold mb-4">Medications</h3>
            <ul>
              <li className="text-gray-800 mb-2">Medication 1</li>
              <li className="text-gray-800 mb-2">Medication 2</li>
              <li className="text-gray-800 mb-2">Medication 3</li>
            </ul>
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

  function NextAppointment({ appointment }) {
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