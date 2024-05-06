"use client"
import { CreditCardInput } from '@/app/components/payment/credit-card-input'
import { useFormState } from "react-dom";
import AbstractForm from '@/app/components/forms/abstract-form-full-page'
import { Status } from '@/app/components/forms/validation-helpers'
import { savePatientPaymentInformation, FieldErrors } from './payment-form-handler'
import NameInput from '../name-input';
import { useRouter } from 'next/navigation'


export default function PaymentForm({userId}: {userId: string }) {
  const savePatientPaymentInformationWithUserId = savePatientPaymentInformation.bind(null, userId);
    const [state, formAction] = useFormState(savePatientPaymentInformationWithUserId, {status: Status.NOT_SUBMITTED})
    const router = useRouter();
  return (
    <div className="flex flex-col">
      <AbstractForm<FieldErrors> formAction={formAction} state={state} header='Enter your Payment Information' successAction={() => router.push('/my-dashboard/patient')}>
        <NameInput errorState={state?.error} />
        <CreditCardInput errorState={state?.error} userId={userId} />
      </AbstractForm>
    </div>
  )
}





