"use client"
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { CreditCardInput } from '@/app/components/payment/credit-card-input'
import { FieldErrors, savePatientPaymentInformation } from "@/app/get-started/patient/payment/payment-form-handler";
import { useFormState } from "react-dom";
import AbstractForm from '@/app/components/forms/abstract-form'
import { Status } from '@/app/components/forms/validation-helpers'

export default function PaymentPage({userId}: {userId: string}) {
  const savePatientPaymentInformationWithUserId = savePatientPaymentInformation.bind(null, userId);
    const [state, formAction] = useFormState(savePatientPaymentInformationWithUserId, {status: Status.NOT_SUBMITTED})
  return (
    <div className="flex flex-col">
      <AbstractForm<FieldErrors> formAction={formAction} state={state} header='Enter your Payment Information' redirectUrl='/get-started/patient/complete'>
        <CreditCardInput errorState={state?.error} userId={userId} />
      </AbstractForm>
    </div>
  )
}

export function AddCreditCardModal({ open, setOpen }: {open: boolean, setOpen: (x: boolean) => {}}) {

  function handleCreditCardSave(): void {
    async function asyncDelay() {
      // Simulate asynchronous delay using setTimeout
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1000 milliseconds delay

      // After the delay, setModal(false)

    }

    // Call the async function
    asyncDelay().then(() => setOpen(false));
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Add Payment Info
                    </Dialog.Title>
                    <div className="mt-2">
                      
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => handleCreditCardSave()}
                  >
                    Save
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}





