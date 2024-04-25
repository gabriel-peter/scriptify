'use client'
import { addPersonalInformation } from '@/app/api/patient-get-started/personal-patient-form-handler'
import AbstractForm from '@/app/components/form/abstract-form'
import AddressSubForm from '@/app/components/form/address-sub-form'
import EmailInput from '@/app/components/form/email-input'
import NameInput from '@/app/components/form/name-input'
import PhoneNumberInput from '@/app/components/form/phone-number-input'
import UploadFileInput from '@/app/components/form/upload-file-input'
import { useFormState } from 'react-dom'
import { createClient } from '@/utils/supabase/client'
import { useCallback, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'

const initialState = {
  message: '',
}

export default function PatientPersonalInformationForm({userId}:{userId: string}) {
  const addPersonalInformationWithUserId = addPersonalInformation.bind(null, userId);
  const [state, formAction] = useFormState(addPersonalInformationWithUserId, initialState);

  return (
    <AbstractForm formAction={formAction} state={state} header='Personal Information' redirectUrl="/get-started/patient/transfer">
      <div>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <NameInput errorState={state?.error} />
          {/* <EmailInput errorState={state?.error?.email} label={'Add your Email'} /> */}
          <PhoneNumberInput errorState={state?.error?.phoneNumber} label={'Add your Phone Number'} />
          <AddressSubForm errorState={state?.error} />
        </div >
      </div>
      <UploadFileInput title='Upload Drivers License' instruction='Upload a file' supportedFileTypes={['PNG', 'JPG', 'GIF']} maxSize='10MB' />
      <UploadFileInput title='Upload Profile Photo' instruction='Upload a file' supportedFileTypes={['PNG', 'JPG', 'GIF']} maxSize='10MB' />
    </AbstractForm>
  );
}
