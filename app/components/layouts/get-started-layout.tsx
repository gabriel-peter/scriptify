"use client";
import { usePathname } from 'next/navigation';
import ProgressionBar from '../forms/form-progression-bar';
import { useEffect, useState } from 'react';
import { Tables } from '@/types_db';
import { Route } from 'next';

export type OnBoardingStepType = { id: "personal" | "clinical" | "payment" | "insurance" | "transfer", name: string, href: Route<string>, status?: string };

function getStatusValue(step: OnBoardingStepType, userStep: Tables<"patient_on_boaring_complete">, pathname: string) {
  const onBoardingMap = {
    personal: userStep.personal_info,
    clinical: userStep.clinical_info,
    payment: userStep.payment_info,
    insurance: userStep.insurance_info,
    transfer: userStep.transfer_info
  };
  if (onBoardingMap[step.id]) {
    return "complete";
  } else if (step.href === pathname) {
    return "current";
  }
  console.log("ON BOARD", onBoardingMap)
  return "upcoming";
}

export default function GetStartedLayout({
  children, // will be a page or nested layout
  steps,
  userStatus
}: {
  children: React.ReactNode,
  steps: OnBoardingStepType[],
  userStatus: Tables<"patient_on_boaring_complete">
}) {
  const pathname = usePathname();
  const [stepState, setSetState] = useState(steps)
  useEffect(() => {
    setSetState(stepState.map((e: OnBoardingStepType) => {
      return (
        {
          ...e,
          status: getStatusValue(e, userStatus, pathname)
        }
      )
    }))
    console.log("STEPS UPDATED")
  }, [pathname, steps, userStatus])

  const currentPageIndex = stepState.findIndex((e: { href: string; }) => e.href === pathname)
  const nextPageIndex = Math.min(currentPageIndex + 1, stepState.length - 1)
  const previousPageIndex = Math.max(currentPageIndex - 1, 0)

  return (
    <>
      <header>
        <ProgressionBar steps={stepState} />
      </header>
      {children}
    </>
  );
}