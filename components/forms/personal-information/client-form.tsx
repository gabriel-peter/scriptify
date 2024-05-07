'use client'
import AbstractForm from '@/components/forms/abstract-form-full-page'
import AddressSubForm from '@/components/forms/address-sub-form'
import NameInput from '@/components/forms/name-input'
import PhoneNumberInput from '@/components/forms/phone-number-input'
import UploadFileInput from '@/components/forms/upload-file-input'
import { useFormState } from 'react-dom'
import GenericInput from '@/components/forms/generic-input'
import { Status } from '@/components/forms/validation-helpers'
import { addPersonalInformation } from './personal-form-handler'
import { useRouter } from 'next/navigation'
import { Dropdown } from '../dropdown'
import { sex } from '@/app/api/patient-get-started/options'
import { Route } from 'next'


export default function PersonalInformationForm({userId, successRedirectUrl}:{userId: string, successRedirectUrl: Route<string>}) {
  const addPersonalInformationWithUserId = addPersonalInformation.bind(null, userId);
  const [state, formAction] = useFormState(addPersonalInformationWithUserId, { status: Status.NOT_SUBMITTED });
  const router = useRouter()
  return (
    <AbstractForm 
    formAction={formAction} 
    state={state}
     header='Personal Information' 
    successAction={() => router.push(successRedirectUrl)}
    >
      <div>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <NameInput errorState={state?.error} />
          <Dropdown id={'sex'} label={'Sex'} options={Object.values(sex)}/>
          <GenericInput
                type="date"
                label={"Date of Birth"}
                id='date-of-birth'
                errorState={state?.error?.dateOfBirth}
                errorMessage={"Invalid Date."}
            />
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
