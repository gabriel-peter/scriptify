"use client"
import { CreditCardInput } from '@/components/payment/credit-card-input'
import { useFormState } from "react-dom";
import AbstractForm from '@/components/forms/abstract-form-full-page'
import { Status } from '@/app/actions/validation-helpers'
import { savePatientPaymentInformation, FieldErrors } from './payment-form-handler'
import NameInput from '../name-input';
import { useRouter } from 'next/navigation'
import { Route } from 'next';


export default function PaymentForm({ userId, successAction, redirectUrl }: { userId: string, successAction?: () => void, redirectUrl?: Route<string> }) {
  const savePatientPaymentInformationWithUserId = savePatientPaymentInformation.bind(null, userId);
  const [state, formAction] = useFormState(savePatientPaymentInformationWithUserId, { status: Status.NOT_SUBMITTED })
  const router = useRouter();
  return (
      <AbstractForm<FieldErrors>
        formAction={formAction}
        state={state}
        header='Enter your Payment Information'
        successAction={successAction ? () => successAction() : () => router.push(redirectUrl!)}
        secondaryButton={() => <button type='button' onClick={successAction ? () => successAction() : () => router.push(redirectUrl!)}>Skip</button>}
      >
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4">
        <NameInput errorState={state?.error} />
        </div>
        <CreditCardInput errorState={state?.error} userId={userId} />
      </AbstractForm>
  )
}





