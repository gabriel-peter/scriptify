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
import { computeAge, stringifyAddress, stringifyName } from '@/utils/user-attribute-modifiers'
import { ClientActions } from './client-actions'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { DescriptionList, DescriptionTerm, DescriptionDetails } from '@/components/catalyst-ui/description-list'
import moment from 'moment'
import { Heading, Subheading } from '@/components/catalyst-ui/heading'

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
                            <div className='flex flex-col'>
                                <Heading>
                                    Patient
                                    </Heading>
                                <Subheading level={5}>{stringifyName(userProfile?.data.profiles)}</Subheading>
                            </div>
                        </div>
                        <ClientActions patientId={patientId} pharmacistId={pharmacistId} assignment={userProfile.data.pharmacist_to_patient_match} />
                    </div>
                </div>
            </header>
            <PaddedContainer>

                <DescriptionList>

                    <DescriptionTerm>Date of Birth</DescriptionTerm>
                    <DescriptionDetails>{moment(userProfile.data.profiles?.date_of_birth).format("MMMM Do YYYY")} ({computeAge(userProfile.data.profiles?.date_of_birth)} years old)</DescriptionDetails>

                    <DescriptionTerm>Address</DescriptionTerm>
                    <DescriptionDetails>{stringifyAddress(userProfile.data.profiles)}</DescriptionDetails>

                </DescriptionList>
            </PaddedContainer>
        </>
    )
}