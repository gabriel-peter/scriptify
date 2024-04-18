/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
'use client'
import { addPersonalInformation } from '@/app/api/patient-get-started/personal-patient-form-handler'
import AddressSubForm from '@/app/components/form/address-sub-form'
import EmailInput from '@/app/components/form/email-input'
import NameInput from '@/app/components/form/name-input'
import PhoneNumberInput from '@/app/components/form/phone-number-input'
import { SubmitButton } from '@/app/components/form/submit-button'
import UploadFileInput from '@/app/components/form/upload-file-input'
import { useFormState } from 'react-dom'

const initialState = {
  message: '',
}

export default function PatientPersonalInformationForm({userId}: {userId: string}) {
  const addPersonalInformationWithUserId = addPersonalInformation.bind(null, "user-id");
  const [state, formAction] = useFormState(addPersonalInformationWithUserId, initialState)
  return (
    <form action={formAction}>
      <div className="space-y-12 mt-5">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            {state?.error && "There were errors in your form"}
          </p>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <NameInput errorState={state?.error} />
            <EmailInput errorState={state?.error?.email} label={'Add your Email'} />
            <PhoneNumberInput errorState={state?.error?.phoneNumber} label={'Add your Phone Number'} />
            <AddressSubForm errorState={state?.error} />
          </div >
        </div>
        <UploadFileInput title='Upload Drivers License' instruction='Upload a file' supportedFileTypes={['PNG', 'JPG', 'GIF']} maxSize='10MB' />
        <UploadFileInput title='Upload Profile Photo' instruction='Upload a file' supportedFileTypes={['PNG', 'JPG', 'GIF']} maxSize='10MB' />
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        {/* TODO previous button that goes to previous page */}
        <SubmitButton redirectUrl={state?.message && "/get-started/patient/transfer"}/>
      </div>
    </form>
  )
}
