export default function Dashboard() {
 return <PharmaceuticalPatientDashboard/>
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