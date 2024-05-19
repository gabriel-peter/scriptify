"use client"
import { Fragment, Suspense, useEffect, useState } from 'react'
import { Combobox, Dialog, Transition, Menu } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { UsersIcon } from '@heroicons/react/24/outline'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { cn } from '@/utils/cn'
import { GetPharmacistsSearchResponse, GetPharmacistQueryFilters, getPharmacists, GetPharmacistByUserIdResponse, getPharmacistsByUserIds } from './get-pharmacists'
import { stringifyName } from '@/utils/user-attribute-modifiers'
import ProfilePhoto from '@/components/data-views/profile-photo'
import { assignPharmacistToPatient, removePharmacistPatientAssignment } from './assign-pharmacist'
import { Tables } from '@/types_db'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { ButtonDivider } from '@/components/action-divider'

type SinglePharmacistType = GetPharmacistsSearchResponse['data'][0] | null;

export default function PharmacistSelectorDropdown({ patientId, assignedPharmacists }: { patientId: string, assignedPharmacists: Tables<'pharmacist_to_patient_match'>[] }) {
    const [open, setOpen] = useState(false)
    const [pharmacists, setPharmacists] = useState<GetPharmacistsSearchResponse['data']>(null);
    const [queryFilters, setQueryFilters] = useState<GetPharmacistQueryFilters>({
    });
    useEffect(() => {
        getPharmacists(queryFilters).then((res) => setPharmacists(res.data))
    }, [queryFilters, setQueryFilters])

    function handleNewAssignment({ patientId, pharmacistId }: { patientId: string, pharmacistId: string }) {
        assignPharmacistToPatient({ patientId, pharmacistId }).then(({ error, data }) => {
            if (error) {
                console.error(error)
            } else {
                console.log("SUCCESS", data)
                setOpen(false)
            }
        })
    }


    if (!pharmacists) {
        return "No Pharms :( TODO"
    }
    // else if () {

    // }

    return (
        <>
            {assignedPharmacists?.length > 0 &&
                <Suspense fallback={'Loading'}>
                    <CurrentPharmacist assignedPharmacists={assignedPharmacists} userId={patientId} />
                </Suspense>
            }
            <ButtonDivider text='Assign Pharmacist' action={() =>setOpen(true)} />
            <Transition.Root show={open} as={Fragment} afterLeave={() => setQueryFilters({})} appear>
                <Dialog className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="mx-auto max-w-3xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
                                <Combobox onChange={(person) => (window.location = person.profileUrl)}>
                                    {({ activeOption }: { activeOption: GetPharmacistsSearchResponse['data'][0] }) => (
                                        <>
                                            <div className="relative">
                                                <MagnifyingGlassIcon
                                                    className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                                <Combobox.Input
                                                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                                                    placeholder="Search..."
                                                    onChange={(event) => setQueryFilters({ ...queryFilters, nameSearch: event.target.value })}
                                                    onBlur={() => setQueryFilters({})}
                                                />
                                            </div>

                                            {(queryFilters.nameSearch === '' || pharmacists.length > 0) && (
                                                <Combobox.Options as="div" static hold className="flex transform-gpu divide-x divide-gray-100">
                                                    <div
                                                        className={cn(
                                                            'max-h-96 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4',
                                                            activeOption && 'sm:h-96'
                                                        )}
                                                    >
                                                        {queryFilters.nameSearch === '' && (
                                                            <h2 className="mb-4 mt-2 text-xs font-semibold text-gray-500">Recent searches</h2>
                                                        )}
                                                        <div className="-mx-2 text-sm text-gray-700">
                                                            {pharmacists && (queryFilters.nameSearch === '' ? pharmacists // this used to be variable recents
                                                                : pharmacists).map((person) => (
                                                                    <Combobox.Option
                                                                        as="div"
                                                                        key={person.id}
                                                                        value={person}
                                                                        className={({ active }) =>
                                                                            cn(
                                                                                'flex cursor-default select-none items-center rounded-md p-2',
                                                                                active && 'bg-gray-100 text-gray-900'
                                                                            )
                                                                        }
                                                                    >
                                                                        {({ active }) => (
                                                                            <>
                                                                                {/* <img src={person.imageUrl} alt="" className="h-6 w-6 flex-none rounded-full" /> */}
                                                                                <ProfilePhoto userId={person.id!} size={30} />
                                                                                <span className="ml-3 flex-auto truncate">{stringifyName(person.profiles!)}</span>
                                                                                {active && (
                                                                                    <ChevronRightIcon
                                                                                        className="ml-3 h-5 w-5 flex-none text-gray-400"
                                                                                        aria-hidden="true"
                                                                                    />
                                                                                )}
                                                                            </>
                                                                        )}
                                                                    </Combobox.Option>
                                                                ))}
                                                        </div>
                                                    </div>

                                                    {activeOption && (
                                                        <>
                                                            <div className="hidden h-96 w-1/2 flex-none flex-col divide-y divide-gray-100 overflow-y-auto sm:flex">
                                                                <div className="flex-none p-6 text-center">
                                                                    <ProfilePhoto userId={activeOption.id} size={30} />
                                                                    <h2 className="mt-3 font-semibold text-gray-900">{activeOption.name}</h2>
                                                                    <p className="text-sm leading-6 text-gray-500">{activeOption.role}</p>
                                                                </div>
                                                                <div className="flex flex-auto flex-col justify-between p-6">
                                                                    <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-700">
                                                                        <dt className="col-end-1 font-semibold text-gray-900">Phone</dt>
                                                                        <dd>{activeOption.phone}</dd>
                                                                        <dt className="col-end-1 font-semibold text-gray-900">URL</dt>
                                                                        <dd className="truncate">
                                                                            <a href={activeOption.url} className="text-indigo-600 underline">
                                                                                {activeOption.url}
                                                                            </a>
                                                                        </dd>
                                                                        <dt className="col-end-1 font-semibold text-gray-900">Email</dt>
                                                                        <dd className="truncate">
                                                                            <a href={`mailto:${activeOption.email}`} className="text-indigo-600 underline">
                                                                                {activeOption.email}
                                                                            </a>
                                                                        </dd>
                                                                    </dl>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleNewAssignment({
                                                                            pharmacistId: activeOption.id,
                                                                            patientId: patientId
                                                                        })}
                                                                        className="mt-6 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                                    >
                                                                        Assign to Patient
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}
                                                </Combobox.Options>
                                            )}

                                            {queryFilters.nameSearch !== '' && pharmacists.length === 0 && (
                                                <div className="px-6 py-14 text-center text-sm sm:px-14">
                                                    <UsersIcon className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
                                                    <p className="mt-4 font-semibold text-gray-900">No people found</p>
                                                    <p className="mt-2 text-gray-500">
                                                        We couldn’t find anything with that term. Please try again.
                                                    </p>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </Combobox>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
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
                        <Menu as="div" className="relative flex-none">
                            <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                <span className="sr-only">Open options</span>
                                <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                            </Menu.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={() => removePharmacistPatientAssignment({pharmacistId: person.id, patientId: userId})}
                                                className={cn(
                                                    active ? 'bg-gray-50' : '',
                                                    'block px-3 py-1 text-sm leading-6 text-gray-900'
                                                )}
                                            >
                                                Remove Assignment
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href="#"
                                                className={cn(
                                                    active ? 'bg-gray-50' : '',
                                                    'block px-3 py-1 text-sm leading-6 text-gray-900'
                                                )}
                                            >
                                                Message<span className="sr-only">, {person.name}</span>
                                            </a>
                                        )}
                                    </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                </li>
            ))}
        </ul>
    )
}

