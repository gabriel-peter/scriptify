"use server";
import { checkPharmacistOnBoardingProgress } from '@/app/actions/user/check-on-boarding-progress';
import GetStartedLayout, { OnBoardingStepType } from '@/components/layouts/get-started-layout';
import { redirect } from 'next/navigation';

type PharmacistOnBoardingSteps = "personal" | "license" | "clinical"

const steps: OnBoardingStepType<PharmacistOnBoardingSteps>[] = [
  { id: 'personal', name: 'Personal Information', href: '/pharmacist/get-started/personal' },
  { id: 'license', name: 'Your License', href: '/pharmacist/get-started/license' },
  { id: 'clinical', name: 'Clinical Preferences', href: '/pharmacist/get-started/clinical' },
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