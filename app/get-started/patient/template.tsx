"use server";
import { checkPatientOnBoardingProgress } from '@/app/api/user-actions/check-on-boarding-progress';
import GetStartedLayout, { OnBoardingStepType } from '@/components/layouts/get-started-layout';
import { redirect } from 'next/navigation';

type PatientOnBoardingSteps = "personal" | "clinical" | "payment" | "insurance" | "transfer"

var steps: OnBoardingStepType<PatientOnBoardingSteps>[] = [
  { id: 'personal', name: 'Personal Information', href: '/get-started/patient/personal' },
  { id: 'transfer', name: 'Tranfser Prescriptions', href: '/get-started/patient/transfer' },
  { id: 'clinical', name: 'Clinical Preferences', href: '/get-started/patient/clinical' },
  { id: 'insurance', name: 'Insurances Details', href: '/get-started/patient/insurance' },
  { id: 'payment', name: 'Payment Details', href: '/get-started/patient/payment' },
]

export default async function PatientOnBoardingTemplate({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  const patientOnBoardingStatus = await checkPatientOnBoardingProgress();
  console.log(patientOnBoardingStatus.data)
  if (patientOnBoardingStatus.data === null) {
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
