export default function MedicalInsuranceInfo({ }) {
    // Dummy insurance information
    const dummyInsuranceInfo = {
      company: 'ABC Insurance',
      policyNumber: '123456789',
      groupNumber: '987654321',
      memberId: 'M123456789'
    };
  
    // Merge dummy data with provided insuranceInfo or use dummy data if not provided
    const mergedInsuranceInfo = { ...dummyInsuranceInfo };
  
    return (
      <div className="bg-white rounded-lg shadow-md p-6  mx-3.5 my-5">
        <h2 className="text-xl font-semibold mb-4">Medical Insurance Information</h2>
        <div className="rounded-md bg-gray-50 px-6 py-5 sm:flex sm:items-start sm:justify-between">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 font-medium">Insurance Company:</p>
              <p className="text-gray-800">{mergedInsuranceInfo.company}</p>
            </div>
            <div>
              <p className="text-gray-600 font-medium">Policy Number:</p>
              <p className="text-gray-800">{mergedInsuranceInfo.policyNumber}</p>
            </div>
            <div>
              <p className="text-gray-600 font-medium">Group Number:</p>
              <p className="text-gray-800">{mergedInsuranceInfo.groupNumber}</p>
            </div>
            <div>
              <p className="text-gray-600 font-medium">Member ID:</p>
              <p className="text-gray-800">{mergedInsuranceInfo.memberId}</p>
            </div>
          </div>
          <div className="mt-4 sm:ml-6 sm:mt-0 sm:flex-shrink-0">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    );
  }