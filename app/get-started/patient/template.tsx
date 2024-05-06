"use server";
import GetStartedLayout, { OnBoardingStepType } from '@/app/components/layouts/get-started-layout';
import checkOnBoardingProgress from '../../api/user-actions/check-on-boarding-progress';
import { redirect } from 'next/navigation';

var steps: OnBoardingStepType[] = [
  { id: 'personal', name: 'Personal Information', href: '/get-started/patient/personal' },
  { id: 'transfer', name: 'Tranfser Prescriptions', href: '/get-started/patient/transfer' },
  { id: 'clinical', name: 'Clinical Preferences', href: '/get-started/patient/clinical' },
  { id: 'insurance', name: 'Insurances Details', href: '/get-started/patient/insurance' },
  { id: 'payment', name: 'Payment Details', href: '/get-started/patient/payment' },
  // { id: 'review', name: 'Review', href: '/get-started/patient/complete' },
]

export default async function PatientOnBoardingTemplate({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  const patientOnBoardingStatus = await checkOnBoardingProgress();
  console.log(patientOnBoardingStatus.data)
  if (patientOnBoardingStatus.data === null) {
    redirect("/error")
  }
  return (
      <GetStartedLayout steps={steps} userStatus={patientOnBoardingStatus.data}>
        {children}
      </GetStartedLayout>
  );
}
