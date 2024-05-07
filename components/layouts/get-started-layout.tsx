"use client";
import { usePathname } from 'next/navigation';
import ProgressionBar from '../forms/form-progression-bar';
import { useEffect, useState } from 'react';
import { Route } from 'next';

export type OnBoardingStepType<T> = { id: T, name: string, href: Route<string>, status?: string };

function getStatusValue<T extends string>(step: OnBoardingStepType<T>, onBoardingMap: {[P in T]: boolean}, pathname: string) {
  if (onBoardingMap[step.id]) {
    return "complete";
  } else if (step.href === pathname) {
    return "current";
  }
  console.log("ON BOARD", onBoardingMap)
  return "upcoming";
}

export default function GetStartedLayout<T extends string>({
  children, // will be a page or nested layout
  steps,
  onBoardMap
}: {
  children: React.ReactNode,
  steps: OnBoardingStepType<T>[],
  onBoardMap: {[P in T]: boolean}
}) {
  const pathname = usePathname();
  const [stepState, setSetState] = useState(steps)
  useEffect(() => {
    setSetState(stepState.map((e: OnBoardingStepType<T>) => {
      return (
        {
          ...e,
          status: getStatusValue(e, onBoardMap, pathname)
        }
      )
    }))
    console.log("STEPS UPDATED")
  }, [pathname, steps, onBoardMap])

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