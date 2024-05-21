"use client"

import { cn } from "@/utils/cn"
import { Menu, Transition } from "@headlessui/react"
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid"
import { Fragment } from "react"
import { removePharmacistPatientAssignment } from "./assign-pharmacist"
import { Tables } from "@/types_db"

export default function PatientCurrentPharmacistMenuOptions({pharmacist, userId}:{pharmacist: Tables<'pharmacist_to_patient_match'>, userId: string}) {
    return ( <Menu as="div" className="relative flex-none">
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
                        onClick={() => removePharmacistPatientAssignment({ pharmacistId: pharmacist.id, patientId: userId })}
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
                        Message<span className="sr-only">, {pharmacist.name}</span>
                    </a>
                )}
            </Menu.Item>
        </Menu.Items>
    </Transition>
</Menu>)
}