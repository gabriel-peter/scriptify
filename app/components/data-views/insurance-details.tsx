"use server"
import { Tables } from "@/types_db";
import InsuranceFormModal from "../forms/form-modals/insurance-form-modal";

export default async function MedicalInsuranceInfo({ userId, insurance }: {userId: string, insurance: Tables<"insurance_details"> | null}) {
    return (
      <>
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
            <InsuranceFormModal userId={userId}/>
          </div>
        </div>
      </div>
      </>
    );
  }