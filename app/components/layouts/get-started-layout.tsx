"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ProgressionBar from '../form/form-progression-bar';
import { useEffect, useState } from 'react';

export default function GetStartedLayout({
    children, // will be a page or nested layout
    steps
  }: {
    children: React.ReactNode,
    steps: any
  })  {
    const pathname = usePathname();
    const [stepState, setSetState] = useState(steps)
    useEffect(() => {
        setSetState(stepState.map((e: { href: string; }) => { return ({ ...e, status: e.href === pathname ? "current" : "upcoming" }) }))
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