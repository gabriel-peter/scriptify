"use client"
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { cn } from "@/utils/cn";
import { AvailabilityStatus } from '../../actions/utils';
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@/components/catalyst-ui/dropdown';

const colorMap = {
    'Available': 'bg-green-400',
    'Away': 'bg-yellow-200',
    'Offline': 'bg-gray-200'
}

export default function AvailabilityDrowndown({ currentStatus }: { currentStatus: AvailabilityStatus }) {
    const [selected, setSelected] = useState(currentStatus)
    function updateAvailability(option: AvailabilityStatus) {
        setSelected(option);
    }

    const rowOption = (option: AvailabilityStatus) => (
        <div className="flex items-center">
            <span
                className={cn(
                    colorMap[option],
                    'inline-block h-2 w-2 flex-shrink-0 rounded-full'
                )}
                aria-hidden="true"
            />
            <span
                className={cn(option ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
            >
                {option}
                <span className="sr-only"> is {option ? 'online' : 'offline'}</span>
            </span>
        </div>
    );

    return (
        <Dropdown>
            <DropdownButton aria-label="Account options">
                {rowOption(selected)}
            </DropdownButton>
            <DropdownMenu>
                {Object.values(AvailabilityStatus).map((option) => (
                    <DropdownItem key={option} onClick={() => updateAvailability(option)}>
                        {rowOption(option)}
                    </DropdownItem>))}
            </DropdownMenu>
        </Dropdown>
    )

}

export function Dep_AvailabilityDrowndown({ currentStatus }: { currentStatus: AvailabilityStatus }) {
    const [selected, setSelected] = useState(currentStatus)
    function updateAvailability(option: AvailabilityStatus) {
        setSelected(option);
    }

    return (
        <Listbox value={selected} onChange={updateAvailability}>
            {({ open }) => (
                <>
                    <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">Online Status:</Listbox.Label>
                    <div className="relative mt-2">
                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            <span className="flex items-center">
                                <span
                                    aria-label={selected}
                                    className={cn(
                                        colorMap[selected],
                                        'inline-block h-2 w-2 flex-shrink-0 rounded-full'
                                    )}
                                />
                                <span className="ml-3 block truncate">{selected}</span>
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">

                                {Object.values(AvailabilityStatus).map((option) => (
                                    <Listbox.Option
                                        key={option}
                                        className={({ active }) =>
                                            cn(
                                                active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                            )
                                        }
                                        value={option}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <div className="flex items-center">
                                                    <span
                                                        className={cn(
                                                            colorMap[option],
                                                            'inline-block h-2 w-2 flex-shrink-0 rounded-full'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                    <span
                                                        className={cn(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                    >
                                                        {option}
                                                        <span className="sr-only"> is {option ? 'online' : 'offline'}</span>
                                                    </span>
                                                </div>

                                                {selected ? (
                                                    <span
                                                        className={cn(
                                                            active ? 'text-white' : 'text-indigo-600',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                        )}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    )
}
