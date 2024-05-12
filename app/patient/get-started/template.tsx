"use client";
import { checkPatientOnBoardingProgress } from '@/app/api/user-actions/check-on-boarding-progress';
import GetStartedLayout, { OnBoardingStepType } from '@/components/layouts/get-started-layout';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

type PatientOnBoardingSteps = "personal" | "clinical" | "payment" | "insurance" | "transfer"

var steps: OnBoardingStepType<PatientOnBoardingSteps>[] = [
  { id: 'personal', name: 'Personal Information', href: '/patient/get-started/personal' },
  { id: 'transfer', name: 'Tranfser Prescriptions', href: '/patient/get-started/transfer' },
  { id: 'clinical', name: 'Clinical Preferences', href: '/patient/get-started/clinical' },
  { id: 'insurance', name: 'Insurances Details', href: '/patient/get-started/insurance' },
  { id: 'payment', name: 'Payment Details', href: '/patient/get-started/payment' },
]

// Template re-renders only happen on client, so it won't work in a server component: 
// https://github.com/vercel/next.js/issues/52422#issuecomment-1627157566
export default function PatientOnBoardingTemplate({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [onBoardingMap, setOnBoardingMap] = useState<any>({personal: false,
    clinical: false,
    payment: false,
    insurance: false,
    transfer: false}); 
  useEffect(() => {
    checkPatientOnBoardingProgress()
    .then((patientOnBoardingStatus) => {
      if (patientOnBoardingStatus.data === null) {
        console.log("patientOnBoardingStatus.data === null")
        router.push("/error")
        return
      }
      const onBoardingMap = {
        personal: patientOnBoardingStatus.data.personal_info,
        clinical: patientOnBoardingStatus.data.clinical_info,
        payment: patientOnBoardingStatus.data.payment_info,
        insurance: patientOnBoardingStatus.data.insurance_info,
        transfer: patientOnBoardingStatus.data.transfer_info
      };
      return onBoardingMap
    }).then((onBoardingMap) => setOnBoardingMap(onBoardingMap));  
  }, [])
  
  return (
      <GetStartedLayout steps={steps} onBoardMap={onBoardingMap}>
        {children}
      </GetStartedLayout>
  );
}
