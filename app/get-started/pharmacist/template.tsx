"use server";
import { checkPharmacistOnBoardingProgress } from '@/app/api/user-actions/check-on-boarding-progress';
import GetStartedLayout, { OnBoardingStepType } from '@/components/layouts/get-started-layout';
import { redirect } from 'next/navigation';

type PharmacistOnBoardingSteps = "personal" | "license" | "clinical"

const steps: OnBoardingStepType<PharmacistOnBoardingSteps>[] = [
  { id: 'personal', name: 'Personal Information', href: '/get-started/pharmacist/personal' },
  { id: 'license', name: 'Your License', href: '/get-started/pharmacist/license' },
  { id: 'clinical', name: 'Clinical Preferences', href: '/get-started/pharmacist/clinical' },
]

export default async function PharmacistOnBoardingTemplate({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode,
}) {
  const pharmacistOnBoardingStatus = await checkPharmacistOnBoardingProgress();
  console.log(pharmacistOnBoardingStatus.data)
  if (pharmacistOnBoardingStatus.data === null) {
    console.log("pharmacistOnBoardingStatus.data === null")
    redirect("/error")
  }
  const onBoardingMap = {
    personal: pharmacistOnBoardingStatus.data.personal_info,
    clinical: pharmacistOnBoardingStatus.data.clinical_info,
    license: pharmacistOnBoardingStatus.data.license_info,
  };
  return (
    <GetStartedLayout steps={steps} onBoardMap={onBoardingMap}>
      {children}
    </GetStartedLayout>
  );
};