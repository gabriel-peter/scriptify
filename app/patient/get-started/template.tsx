"use server";
import { checkPatientOnBoardingProgress } from '@/app/actions/user/check-on-boarding-progress';
import GetStartedLayout, { OnBoardingStepType } from '@/components/layouts/get-started-layout';
import { redirect } from 'next/navigation';

type PatientOnBoardingSteps = "personal" | "clinical" | "payment" | "insurance" | "transfer"

var steps: OnBoardingStepType<PatientOnBoardingSteps>[] = [
  { id: 'personal', name: 'Personal Information', href: '/patient/get-started/personal' },
  { id: 'transfer', name: 'Tranfser Prescriptions', href: '/patient/get-started/transfer' },
  { id: 'clinical', name: 'Clinical Preferences', href: '/patient/get-started/clinical' },
  { id: 'insurance', name: 'Insurances Details', href: '/patient/get-started/insurance' },
  { id: 'payment', name: 'Payment Details', href: '/patient/get-started/payment' },
]

// (NO LONGER TRUE): Template re-renders only happen on client, so it won't work in a server component: 
// https://github.com/vercel/next.js/issues/52422#issuecomment-1627157566
export default async function PatientOnBoardingTemplate({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  const patientOnBoardingStatus = await checkPatientOnBoardingProgress() 
  console.log(patientOnBoardingStatus.data)
  if (patientOnBoardingStatus.data === null) {
    console.log("pharmacistOnBoardingStatus.data === null")
    redirect("/error")
  }
  const onBoardingMap = {
    personal: patientOnBoardingStatus.data.personal_info,
    clinical: patientOnBoardingStatus.data.clinical_info,
    payment: patientOnBoardingStatus.data.payment_info,
    insurance: patientOnBoardingStatus.data.insurance_info,
    transfer: patientOnBoardingStatus.data.transfer_info
  };
  
  return (
      <GetStartedLayout steps={steps} onBoardMap={onBoardingMap}>
        {children}
      </GetStartedLayout>
  );
}
