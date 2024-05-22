"use server"

import { GetPatientByIdResponse, getPatientProfile } from "../get-patient"
import {
    Bars3Icon,
    CalendarIcon,
    CogIcon,
    HomeIcon,
    MagnifyingGlassCircleIcon,
    MapIcon,
    MegaphoneIcon,
    SquaresPlusIcon,
    UserGroupIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronLeftIcon, EllipsisVerticalIcon, EnvelopeIcon, FunnelIcon, MagnifyingGlassIcon, PhoneIcon } from '@heroicons/react/20/solid'
import ProfilePhoto from "@/components/data-views/profile-photo";
import { cn } from "@/utils/cn";
import { stringifyName } from "@/utils/user-attribute-modifiers";
import PharmacistSelectorDropdown from "./pharmacist-selector";
import { MyTransfers } from "@/components/data-views/transfer_requests/table-view";
import { Tables } from "@/types_db";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, Suspense } from "react";
import { removePharmacistPatientAssignment } from "./assign-pharmacist";
import { getPharmacistsByUserIds } from "./get-pharmacists";
import PatientCurrentPharmacistMenuOptions from "./current-pharmacist-menu";

const tabs = [
    { name: 'Profile', href: '#', current: true },
    { name: 'Calendar', href: '#', current: false },
    { name: 'Recognition', href: '#', current: false },
]

export default async function PatientViewPage({ params }: { params: { id: string } }) {
    const response: GetPatientByIdResponse = await getPatientProfile(params.id);
    console.log(response.data);
    if (response.error) {
        console.log(response.error)
        return "Error Loading Patient"
    }

    const user = response.data;
    return (<>
        <article>
            {/* Profile header */}
            <div>
                <div>
                    <img className="h-32 w-full object-cover lg:h-48" src={'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'} alt="" />
                </div>
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                        <div className="flex">
                            <ProfilePhoto userId={user.id!} size={80} />
                        </div>
                        <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                            <div className="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
                                <h1 className="truncate text-2xl font-bold text-gray-900">{stringifyName(response.data?.profiles!)}</h1>
                            </div>
                            <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                                <button
                                    type="button"
                                    className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                >
                                    <EnvelopeIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                    Message
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                >
                                    <PhoneIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                    Call
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
                        <h1 className="truncate text-2xl font-bold text-gray-900">{stringifyName(response.data?.profiles!)}</h1>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="mt-6 sm:mt-2 2xl:mt-5">
                <div className="border-b border-gray-200">
                    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                            {tabs.map((tab) => (
                                <a
                                    key={tab.name}
                                    href={tab.href}
                                    className={cn(
                                        tab.current
                                            ? 'border-pink-500 text-gray-900'
                                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                        'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
                                    )}
                                    aria-current={tab.current ? 'page' : undefined}
                                >
                                    {tab.name}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>

            {/* Description list */}
            <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    {Object.keys(user.profiles).map((field) => (
                        <div key={field} className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">{field}</dt>
                            <dd className="mt-1 text-sm text-gray-900">{user.profiles[field]}</dd>
                        </div>
                    ))}
                    <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">Current Pharmacist</dt>
                        {/* <dd
                        className="mt-1 max-w-prose space-y-5 text-sm text-gray-900"
                        dangerouslySetInnerHTML={{ __html: profile.about }}
                      /> */}
                      <Suspense fallback="LOADING">
                        <CurrentPharmacist userId={user.id!} assignedPharmacists={user.pharmacist_to_patient_match} />
                      </Suspense>
                      <PharmacistSelectorDropdown patientId={user.id!} assignedPharmacists={user.pharmacist_to_patient_match} />
                    </div>
                </dl>
            </div>

            {/* Team member list */}
            <div className="mx-auto mt-8 max-w-5xl px-4 pb-12 sm:px-6 lg:px-8">
                <h2 className="text-sm font-medium text-gray-500">Transfer Requests</h2>
                <MyTransfers prescriptionTransfers={user.transfer_requests} />
            </div>
        </article>
    </>)
}

async function CurrentPharmacist({ assignedPharmacists, userId }: { assignedPharmacists: Tables<'pharmacist_to_patient_match'>[], userId: string }) {
    const response = await getPharmacistsByUserIds(assignedPharmacists.map(e => e.pharmacist_id))
    if (response.error) {
        return "Error"
    }
    const pharmacists = response.data;
    return (
        <ul role="list" className="divide-y divide-gray-100">
            {pharmacists.map((person) => (
                <li key={person.email} className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                        <ProfilePhoto userId={person.id} size={30} />
                        <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                                <a
                                    // href={person.href}
                                    className="hover:underline">
                                    {stringifyName(person.profiles)}
                                </a>
                            </p>
                            <p className="mt-1 flex text-xs leading-5 text-gray-500">
                                <a href={`mailto:${person.email}`} className="truncate hover:underline">
                                    {person.email}
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-x-6">
                        <div className="hidden sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">{person.role}</p>
                            {/* {person.lastSeen ? (
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Assigned since <time dateTime={person.pharmacist_to_patient_match}>{person.lastSeen}</time>
                </p>
              ) : (
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-xs leading-5 text-gray-500">Online</p>
                </div>
              )} */}
                        </div>
                        <PatientCurrentPharmacistMenuOptions pharmacist={person} userId={userId} />
                    </div>
                </li>
            ))}
        </ul>
    )
}
