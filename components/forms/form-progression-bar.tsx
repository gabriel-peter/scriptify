"use client"
import { cn } from '@/utils/cn'
import { CheckIcon } from '@heroicons/react/24/solid'
import { OnBoardingStepType } from '../layouts/get-started-layout'
import Link from 'next/link'

export default function ProgressionBar<T>({steps}: {steps: OnBoardingStepType<T>[]}) {
    return (
      // <div className="lg:border-b lg:border-t lg:border-gray-200">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Progress">
          <ol
            role="list"
            className="overflow-hidden rounded-md lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-gray-200"
          >
            {steps.map((step, stepIdx: number) => (
              <li key={stepIdx} className="relative overflow-hidden lg:flex-1">
                <div
                  className={cn(
                    stepIdx === 0 ? 'rounded-t-md border-b-0' : '',
                    stepIdx === steps.length - 1 ? 'rounded-b-md border-t-0' : '',
                    'overflow-hidden border border-gray-200 lg:border-0'
                  )}
                >
                  {step.status === 'complete' ? (
                    <div className="group">
                      <span
                        className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-gray-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                        aria-hidden="true"
                      />
                      <span
                        className={cn(
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
                          {/* <span className="text-sm font-medium">{step.name}</span> */}
                          <span className="text-sm font-medium text-gray-500">{step.name}</span>
                        </span>
                      </span>
                    </div>
                  ) : step.status === 'current' ? (
                    <Link prefetch href={step.href} aria-current="step">
                      <span
                        className="absolute left-0 top-0 h-full w-1 bg-indigo-600 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                        aria-hidden="true"
                      />
                      <span
                        className={cn(
                          stepIdx !== 0 ? 'lg:pl-9' : '',
                          'flex items-start px-6 py-5 text-sm font-medium'
                        )}
                      >
                        <span className="flex-shrink-0">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-indigo-600">
                            <span className="text-indigo-600">{stepIdx + 1}</span>
                          </span>
                        </span>
                        <span className="ml-4 mt-0.5 flex min-w-0 flex-col">
                          <span className="text-sm font-medium text-indigo-600">{step.name}</span>
                          {/* <span className="text-sm font-medium text-gray-500">{step.description}</span> */}
                        </span>
                      </span>
                    </Link>
                  ) : (
                    <Link prefetch href={step.href} className="group">
                      <span
                        className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-gray-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                        aria-hidden="true"
                      />
                      <span
                        className={cn(
                          stepIdx !== 0 ? 'lg:pl-9' : '',
                          'flex items-start px-6 py-5 text-sm font-medium'
                        )}
                      >
                        <span className="flex-shrink-0">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300">
                            <span className="text-gray-500">{stepIdx + 1}</span>
                          </span>
                        </span>
                        <span className="ml-4 mt-0.5 flex min-w-0 flex-col">
                          <span className="text-sm font-medium text-gray-500">{step.name}</span>
                          {/* <span className="text-sm font-medium text-gray-500">{step.description}</span> */}
                        </span>
                      </span>
                    </Link>
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