"use server";
import GetStartedLayout from '@/app/components/layouts/get-started-layout';
import checkOnBoardingProgress from './check-on-boarding-progress';

var steps = [
  { id: 'personal', name: 'Personal Information', href: '/get-started/patient/personal' },
  { id: 'transfer', name: 'Tranfser Prescriptions', href: '/get-started/patient/transfer' },
  { id: 'clinical', name: 'Clinical Preferences', href: '/get-started/patient/clinical' },
  { id: 'insurance', name: 'Insurances Details', href: '/get-started/patient/insurance' },
  { id: 'payment', name: 'Payment Details', href: '/get-started/patient/payment' },
  { id: 'review', name: 'Review', href: '/get-started/patient/complete' },
]

export default async function PatientOnBoardingTemplate({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  const patientOnBoardingStatus = await checkOnBoardingProgress();
  return (
      <GetStartedLayout steps={steps} userStatus={patientOnBoardingStatus.data?.steps}>
        {children}
      </GetStartedLayout>
  );
}
