"use client";
import { CheckIcon } from '@heroicons/react/24/solid'
import Link from 'next/link';
import { usePathname } from 'next/navigation';




function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Layout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname();

    console.log(pathname)
  // Access the current route
  const steps = [
    { id: '01', name: 'Personal Information', description: 'Vitae sed mi luctus laoreet.', href: '/get-started/patient/personal', status: 'complete' },
    { id: '02', name: 'Transer Prescriptions', description: 'Cursus semper viverra.', href: '/get-started/patient/transfer', status: 'current' },
    { id: '03', name: 'Clinical Preferences', description: 'Penatibus eu quis ante.', href: '/get-started/patient/clinical', status: 'upcoming' },
    { id: '04', name: 'Payment Details', description: 'Penatibus eu quis ante.', href: '/get-started/patient/payment', status: 'upcoming' },
    { id: '05', name: 'Complete', description: 'Penatibus eu quis ante.', href: '/get-started/patient/complete', status: 'upcoming' },
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

export function ProgressionBar({steps}: {steps: any}) {
  return (
    // <div className="lg:border-b lg:border-t lg:border-gray-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Progress">
        <ol
          role="list"
          className="overflow-hidden rounded-md lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-gray-200"
        >
          {steps.map((step, stepIdx) => (
            <li key={step.id} className="relative overflow-hidden lg:flex-1">
              <div
                className={classNames(
                  stepIdx === 0 ? 'rounded-t-md border-b-0' : '',
                  stepIdx === steps.length - 1 ? 'rounded-b-md border-t-0' : '',
                  'overflow-hidden border border-gray-200 lg:border-0'
                )}
              >
                {step.status === 'complete' ? (
                  <a href={step.href} className="group">
                    <span
                      className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-gray-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                      aria-hidden="true"
                    />
                    <span
                      className={classNames(
                        stepIdx !== 0 ? 'lg:pl-9' : '',
                        'flex items-start px-6 py-5 text-sm font-medium'
                      )}
                    >
                      <span className="flex-shrink-0">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600">
                          <CheckIcon className="h-6 w-6 text-white" aria-hidden="true" />
                        </span>
                      </span>
                      <span className="ml-4 mt-0.5 flex min-w-0 flex-col">
                        <span className="text-sm font-medium">{step.name}</span>
                        {/* <span className="text-sm font-medium text-gray-500">{step.description}</span> */}
                      </span>
                    </span>
                  </a>
                ) : step.status === 'current' ? (
                  <a href={step.href} aria-current="step">
                    <span
                      className="absolute left-0 top-0 h-full w-1 bg-indigo-600 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                      aria-hidden="true"
                    />
                    <span
                      className={classNames(
                        stepIdx !== 0 ? 'lg:pl-9' : '',
                        'flex items-start px-6 py-5 text-sm font-medium'
                      )}
                    >
                      <span className="flex-shrink-0">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-indigo-600">
                          <span className="text-indigo-600">{step.id}</span>
                        </span>
                      </span>
                      <span className="ml-4 mt-0.5 flex min-w-0 flex-col">
                        <span className="text-sm font-medium text-indigo-600">{step.name}</span>
                        {/* <span className="text-sm font-medium text-gray-500">{step.description}</span> */}
                      </span>
                    </span>
                  </a>
                ) : (
                  <a href={step.href} className="group">
                    <span
                      className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-gray-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                      aria-hidden="true"
                    />
                    <span
                      className={classNames(
                        stepIdx !== 0 ? 'lg:pl-9' : '',
                        'flex items-start px-6 py-5 text-sm font-medium'
                      )}
                    >
                      <span className="flex-shrink-0">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300">
                          <span className="text-gray-500">{step.id}</span>
                        </span>
                      </span>
                      <span className="ml-4 mt-0.5 flex min-w-0 flex-col">
                        <span className="text-sm font-medium text-gray-500">{step.name}</span>
                        {/* <span className="text-sm font-medium text-gray-500">{step.description}</span> */}
                      </span>
                    </span>
                  </a>
                )}

                {stepIdx !== 0 ? (
                  <>
                    {/* Separator */}
                    <div className="absolute inset-0 left-0 top-0 hidden w-3 lg:block" aria-hidden="true">
                      <svg
                        className="h-full w-full text-gray-300"
                        viewBox="0 0 12 82"
                        fill="none"
                        preserveAspectRatio="none"
                      >
                        <path d="M0.5 0V31L10.5 41L0.5 51V82" stroke="currentcolor" vectorEffect="non-scaling-stroke" />
                      </svg>
                    </div>
                  </>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </nav>
    // </div>
  )
}
