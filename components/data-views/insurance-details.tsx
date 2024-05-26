"use server"
import { Tables } from "@/types_db";
import InsuranceFormModal from "../forms/form-modals/insurance-form-modal";

export default async function MedicalInsuranceInfo({ userId, insurance }: {userId: string, insurance: Tables<"insurance_details"> | null}) {
    return (
      // <div className="bg-white shadow sm:rounded-lg mx-3.5 my-5">
      <>
      {insurance === null ? (
        <>
        <InsuranceFormModal userId={userId} buttonName="Add Insurance"/>
        </>
      ) : (
      <div className="bg-white rounded-lg shadow-md p-6  mx-3.5 my-5">
        <h2 className="text-xl font-semibold mb-4">Medical Insurance Information</h2>
        <div className="rounded-md bg-gray-50 px-6 py-5 sm:flex sm:items-start sm:justify-between">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 font-medium">Insurance Company:</p>
              <p className="text-gray-800">{insurance?.insurance_name}</p>
            </div>
            <div>
              <p className="text-gray-600 font-medium">Policy Number:</p>
              <p className="text-gray-800">{insurance?.pcn}</p>
            </div>
            <div>
              <p className="text-gray-600 font-medium">Group Number:</p>
              <p className="text-gray-800">{insurance?.rx_group_num}</p>
            </div>
            <div>
              <p className="text-gray-600 font-medium">Member ID:</p>
              <p className="text-gray-800">{insurance?.id}</p>
            </div>
          </div>
          <div className="mt-4 sm:ml-6 sm:mt-0 sm:flex-shrink-0">
            <InsuranceFormModal userId={userId} buttonName="Edit"/>
          </div>
        </div>
      </div>
      )}
      </>
    );
  }

  function EmptyStateButton() {
    return (<button
      type="button"
      className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 48 48"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
        />
      </svg>
      <span className="mt-2 block text-sm font-semibold text-gray-900">You have no insurance info yet, add it.</span>
    </button>)
  }