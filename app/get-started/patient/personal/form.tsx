'use client'
import { addPersonalInformation } from '@/app/get-started/patient/personal/personal-patient-form-handler'
import AbstractForm from '@/app/components/forms/abstract-form'
import AddressSubForm from '@/app/components/forms/address-sub-form'
import NameInput from '@/app/components/forms/name-input'
import PhoneNumberInput from '@/app/components/forms/phone-number-input'
import UploadFileInput from '@/app/components/forms/upload-file-input'
import { useFormState } from 'react-dom'
import GenericInput from '@/app/components/forms/generic-input'


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
