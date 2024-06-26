'use client'
import AbstractForm from '@/components/forms/abstract-form-full-page'
import AddressSubForm from '@/components/forms/address-sub-form'
import NameInput from '@/components/forms/name-input'
import UploadFileInput from '@/components/forms/upload-file-input'
import { useFormState } from 'react-dom'
import GenericInput from '@/components/forms/generic-input'
import { Status } from '@/app/actions/validation-helpers'
import { addPersonalInformation } from './personal-form-handler'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import CustomDropdown, { NativeDropdown } from '../dropdown'
import { CustomSelect } from '../CustomSelect'
import { sex } from '@/app/actions/options'
import { Route } from 'next'
import FailedSubmission from '@/components/alerts/failed-submit-alert'


export default function PersonalInformationForm({ userId, successRedirectUrl }: { userId: string, successRedirectUrl: Route<string> }) {
  const errorParam = useSearchParams().get("error")
  const addPersonalInformationWithUserId = addPersonalInformation.bind(null, userId);
  const [state, formAction] = useFormState(addPersonalInformationWithUserId, { status: Status.NOT_SUBMITTED });
  const router = useRouter()
  return (
    <>
      {errorParam === 'mandatory_complete' && <FailedSubmission title="Error occurred while visting page."
        errorList={["You must complete the 'Personal Information' page to complete your on-boarding process."]} />}
      <AbstractForm
        formAction={formAction}
        state={state}
        header='Personal Information'
        successAction={() => router.push(successRedirectUrl)}
      >
        <>
          {/* <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"> */}
            <NameInput errorState={state?.error} />
            {/* <div className="sm:col-span-3"> */}
              <CustomSelect errorState={state.error?.sex} id={'sex'} label={'Sex'} options={Object.values(sex)} />
            {/* </div> */}
            <GenericInput
              type="date"
              label={"Date of Birth"}
              id='date-of-birth'
              errorState={state?.error?.dateOfBirth}
              errorMessage={"Invalid Date."}
            />
            <GenericInput
              errorState={state?.error?.phoneNumber}
              label={'Add your Phone Number'}
              type='tel'
              id="phone-number"
              placeholder="+1 555-987-6543"
            />
            <AddressSubForm errorState={state?.error} />
          {/* </div > */}
        </>
        {/* <UploadFileInput title='Upload Drivers License' instruction='Upload a file' supportedFileTypes={['PNG', 'JPG', 'GIF']} maxSize='10MB' />
        <UploadFileInput title='Upload Profile Photo' instruction='Upload a file' supportedFileTypes={['PNG', 'JPG', 'GIF']} maxSize='10MB' /> */}
      </AbstractForm>
    </>
  );
}
