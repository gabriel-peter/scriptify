"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ProgressionBar from '../forms/form-progression-bar';
import { useEffect, useState } from 'react';
import { Json } from '@/types_db';

type OnBoardingStepType = {id: string, name: string, href: string, status?: string};

function getStatusValue(step: OnBoardingStepType, userStep: Json, pathname: string) {
  if (userStep !== undefined && userStep[step.id] !== null) {
    return "complete";
  } else if (step.href === pathname) {
    return "current";
  }
  return "upcoming";
}

export default function GetStartedLayout({
    children, // will be a page or nested layout
    steps,
    userStatus
  }: {
    children: React.ReactNode,
    steps: OnBoardingStepType[],
    userStatus: Json
  })  {
    const pathname = usePathname();
    const [stepState, setSetState] = useState(steps)
    useEffect(() => {
        setSetState(stepState.map((e: OnBoardingStepType) => { return (
          { ...e, 
            status: getStatusValue(e, userStatus, pathname)
          }
        ) }))
        console.log(steps)
    }, [pathname, steps])
    
    const currentPageIndex = stepState.findIndex((e: { href: string; }) => e.href === pathname)
    const nextPageIndex = Math.min(currentPageIndex + 1, stepState.length - 1)
    const previousPageIndex = Math.max(currentPageIndex - 1, 0)
  
     return (<>
      <header>
        <ProgressionBar steps={stepState} />
      </header>
      {children}
    </>
    );
}