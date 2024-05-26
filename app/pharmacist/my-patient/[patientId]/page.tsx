"use server"
import {
    Bars3Icon,
    CalendarDaysIcon,
    CreditCardIcon,
    EllipsisVerticalIcon,
    FaceFrownIcon,
    FaceSmileIcon,
    FireIcon,
    HandThumbUpIcon,
    HeartIcon,
    PaperClipIcon,
    UserCircleIcon,
    XMarkIcon as XMarkIconMini,
} from '@heroicons/react/20/solid'
import { getUserDemographicInformationForUserId, getUserOrRedirect } from "@/app/actions/user/get"
import { MyPharmacist, MyAppointments } from "@/app/patient/my-dashboard/page"
import PaddedContainer from "@/components/containers/padded-container"
import PageContainer from "@/components/containers/page-container"
import { MyTransfers } from "@/components/data-views/transfer_requests/table-view"
import { Suspense } from "react"
import ProfilePhoto from '@/components/data-views/profile-photo'
import { stringifyName } from '@/utils/user-attribute-modifiers'
import { ClientActions } from './client-actions'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function MyPatientPage({ params }: { params: { patientId: string } }) {
    const user = await getUserOrRedirect();
    // const response = await 
    return (
        <>
            {/* // <PageContainer> */}
            <PatientDemographics patientId={params.patientId} pharmacistId={user.id} />
            {/* Assigned Pharmacists */}
            <Suspense fallback="Loading">
                <MyPharmacist userId={params.patientId} />
            </Suspense>

            {/* Transfers */}
            <Suspense fallback="Loading">
                <MyTransfers userId={params.patientId} />
            </Suspense>

            {/* Appointments */}
            <Suspense fallback="Loading">
                <MyAppointments userId={params.patientId} />
            </Suspense>

            {/* // </PageContainer> */}
        </>
    )
}


async function PatientDemographics({ patientId, pharmacistId }: { patientId: string, pharmacistId: string }) {
    const userProfile = await createClient().from('users')
    .select("*, profiles!inner(*), pharmacist_to_patient_match!pharmacist_to_patient_match_patient_id_fkey(*)")
    .eq('id', patientId).single();

    if (!userProfile.data) {
        redirect('/error')
    }
    
    await getUserDemographicInformationForUserId(patientId)
    return (
        <>
            <header className="relative isolate">
                <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
                    <div className="absolute left-16 top-full -mt-16 transform-gpu opacity-50 blur-3xl xl:left-1/2 xl:-ml-80">
                        {/* Background Gradient */}
                        <div
                            className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]"
                            style={{
                                clipPath:
                                    'polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)',
                            }}
                        />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gray-900/5" />
                </div>
                <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    <div className="mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none">
                        <div className="flex items-center gap-x-6">
                            <ProfilePhoto userId={patientId} size={80} />
                            <h1>
                                <div className="text-sm leading-6 text-gray-500">
                                    Patient
                                </div>
                                <div className="mt-1 text-base font-semibold leading-6 text-gray-900">{stringifyName(userProfile?.data.profiles)}</div>
                            </h1>
                        </div>
                        <ClientActions patientId={patientId} pharmacistId={pharmacistId} assignment={userProfile.data.pharmacist_to_patient_match} />
                    </div>
                </div>
            </header>
            <PaddedContainer>

                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {/* Invoice summary */}
                        <div className="lg:col-start-3 lg:row-end-1">
                            <h2 className="sr-only">Summary</h2>
                            <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
                                <dl className="flex flex-wrap">
                                    <div className="flex-auto pl-6 pt-6">
                                        <dt className="text-sm font-semibold leading-6 text-gray-900">Amount</dt>
                                        <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">$10,560.00</dd>
                                    </div>
                                    <div className="flex-none self-end px-6 pt-4">
                                        <dt className="sr-only">Status</dt>
                                        <dd className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-600/20">
                                            Paid
                                        </dd>
                                    </div>
                                    <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                                        <dt className="flex-none">
                                            <span className="sr-only">Client</span>
                                            <UserCircleIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
                                        </dt>
                                        <dd className="text-sm font-medium leading-6 text-gray-900">Alex Curren</dd>
                                    </div>
                                    <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                                        <dt className="flex-none">
                                            <span className="sr-only">Due date</span>
                                            <CalendarDaysIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
                                        </dt>
                                        <dd className="text-sm leading-6 text-gray-500">
                                            <time dateTime="2023-01-31">January 31, 2023</time>
                                        </dd>
                                    </div>
                                    <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                                        <dt className="flex-none">
                                            <span className="sr-only">Status</span>
                                            <CreditCardIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
                                        </dt>
                                        <dd className="text-sm leading-6 text-gray-500">Paid with MasterCard</dd>
                                    </div>
                                </dl>
                                <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
                                    <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                                        Download receipt <span aria-hidden="true">&rarr;</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Invoice */}
                        <div className="-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16">
                            <h2 className="text-base font-semibold leading-6 text-gray-900">Invoice</h2>
                            <dl className="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2">
                                <div className="sm:pr-4">
                                    <dt className="inline text-gray-500">Billing Address</dt>{' '}
                                    <dd className="inline text-gray-700">
                                        <time dateTime="2023-23-01">January 23, 2023</time>
                                    </dd>
                                </div>
                                <div className="mt-2 sm:mt-0 sm:pl-4">
                                    <dt className="inline text-gray-500">Due on</dt>{' '}
                                    <dd className="inline text-gray-700">
                                        <time dateTime="2023-31-01">January 31, 2023</time>
                                    </dd>
                                </div>
                                <div className="mt-6 border-t border-gray-900/5 pt-6 sm:pr-4">
                                    <dt className="font-semibold text-gray-900">Mailing Address</dt>
                                    <dd className="mt-2 text-gray-500">
                                        <span className="font-medium text-gray-900">Acme, Inc.</span>
                                        <br />
                                        7363 Cynthia Pass
                                        <br />
                                        Toronto, ON N3Y 4H8
                                    </dd>
                                </div>
                                <div className="mt-8 sm:mt-6 sm:border-t sm:border-gray-900/5 sm:pl-4 sm:pt-6">
                                    <dt className="font-semibold text-gray-900">To</dt>
                                    <dd className="mt-2 text-gray-500">
                                        <span className="font-medium text-gray-900">Tuple, Inc</span>
                                        <br />
                                        886 Walter Street
                                        <br />
                                        New York, NY 12345
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </PaddedContainer>
        </>
    )
}