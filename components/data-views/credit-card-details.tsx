"use server"
import { Tables } from "@/types_db"
import PaymentFormModal from "../forms/form-modals/payment-form-modal"

// TODO support multiple cards.
export default async function SavedCreditCard({ userId, ccDetails }: { userId: string, ccDetails: Tables<"payments_details"> | null }) {
  return (
    <>
      {ccDetails === null ? (
        <PaymentFormModal userId={userId} buttonName="Add Payment Details"/>
        // <button
        //   type="button"
        //   className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        // >
        //   <svg
        //     className="mx-auto h-12 w-12 text-gray-400"
        //     stroke="currentColor"
        //     fill="none"
        //     viewBox="0 0 48 48"
        //     aria-hidden="true"
        //   >
        //     <path
        //       strokeLinecap="round"
        //       strokeLinejoin="round"
        //       strokeWidth={2}
        //       d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
        //     />
        //   </svg>
        //   <span className="mt-2 block text-sm font-semibold text-gray-900">You have no payment info yet, add it.</span>
        // </button>
      )
        : (
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">Payment method</h3>
            <div className="mt-5">
              <div className="rounded-md bg-gray-50 px-6 py-5 sm:flex sm:items-start sm:justify-between">
                <h4 className="sr-only">Visa</h4>
                <div className="sm:flex sm:items-start">
                  <svg className="h-8 w-auto sm:h-6 sm:flex-shrink-0" viewBox="0 0 36 24" aria-hidden="true">
                    <rect width={36} height={24} fill="#224DBA" rx={4} />
                    <path
                      fill="#fff"
                      d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z"
                    />
                  </svg>
                  <div className="mt-3 sm:ml-4 sm:mt-0">
                    <div className="text-sm font-medium text-gray-900">Ending with {ccDetails?.card_number.slice(-4)}</div>
                    <div className="mt-1 text-sm text-gray-600 sm:flex sm:items-center">
                      <div>Expires {ccDetails?.expiration}</div>
                      <span className="hidden sm:mx-2 sm:inline" aria-hidden="true">
                        &middot;
                      </span>
                      <div className="mt-1 sm:mt-0">Last updated on 22 Aug 2017</div> {/* TODO */}
                    </div>
                  </div>
                </div>
                <div className="mt-4 sm:ml-6 sm:mt-0 sm:flex-shrink-0">
                  <PaymentFormModal userId={userId} buttonName="Edit"/>
                </div>
              </div>
            </div>
          </div>
       )
      }
    </>
  )
}