"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ProgressionBar } from '../patient/layout';


export default function Layout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname();

    console.log(pathname)
  // Access the current route
  const steps = [
    { id: '01', name: 'Personal Information', href: '/get-started/pharmacist/personal' },
    { id: '02', name: 'Your License', href: '/get-started/pharmacist/license' },
    { id: '03', name: 'Clinical Preferences', href: '/get-started/pharmacist/clinical' },
    { id: '05', name: 'Complete', href: '/get-started/patient/complete'},
  ].map((e) => { return ({...e, status: e.href === pathname ? "current": "upcoming" })})

  const currentPageIndex = steps.findIndex(e => e.href === pathname)
  console.log(currentPageIndex)
  const nextPageIndex = Math.min(currentPageIndex + 1, steps.length - 1)
  const previousPageIndex = Math.max(currentPageIndex - 1, 0)

    return (<>
    <header className="bg-white shadow-sm">
    <ProgressionBar steps={steps}/>
    </header>
    {children}
    <div className="mt-6 items-center gap-x-6 flex justify-between items-center">
    <Link
        type="button"
        href={steps[previousPageIndex].href}
        className="rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
      >
        Previous
      </Link>
    <Link
        type="button"
        href={steps[nextPageIndex].href}
        className="rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
      >
        Next
      </Link>
      </div>
    </>);
    
}


