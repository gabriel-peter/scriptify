"use client";
import ProgressionBar from '@/app/components/forms/form-progression-bar';
import { usePathname } from 'next/navigation';

const steps = [
  { id: '01', name: 'Personal Information', href: '/get-started/pharmacist/personal' },
  { id: '02', name: 'Your License', href: '/get-started/pharmacist/license' },
  { id: '03', name: 'Clinical Preferences', href: '/get-started/pharmacist/clinical' },
  { id: '05', name: 'Complete', href: '/get-started/patient/complete' },
]

export default function Layout({
  user,
  children, // will be a page or nested layout
}: {
  children: React.ReactNode,
  user: any // TODO
}) {
  const pathname = usePathname();
  steps.map((e) => { return ({ ...e, status: e.href === pathname ? "current" : "upcoming" }) })
  const currentPageIndex = steps.findIndex(e => e.href === pathname)
  const nextPageIndex = Math.min(currentPageIndex + 1, steps.length - 1)
  const previousPageIndex = Math.max(currentPageIndex - 1, 0)

  return (
    <>
      <header>
        <ProgressionBar steps={steps} />
      </header>
      {children}
    </>
  );
};


