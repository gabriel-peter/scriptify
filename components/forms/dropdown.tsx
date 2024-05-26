
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { cn } from '@/utils/cn'
import AbstractInput from './abstract-input'

export function NativeDropdown({ id, label, options }: { id: string, label: string, options: string[] }) {
  return (
    <div className="flex flex-col my-7 mx-2.5">
      <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <select
        id={id}
        name={id}
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
      >
        {options.map((e) => <option key={e}>{e}</option>)}
      </select>
    </div>
  )
}

export default function CustomDropdown({
  id,
  label,
  options,
  errorState,
  errorMessage,
}: {
  id: string,
  label: string,
  options: string[] | number[],
  errorState: any | undefined,
  errorMessage?: string,
}) {
  const [selected, setSelected] = useState(options[0])

  return (
    <AbstractInput error={errorState} errorMessage={errorMessage}>
      <input className="hidden" readOnly id={id} name={id} value={selected} /> {/* Value sent to form */}
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">{label}</Listbox.Label>
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <span className="block truncate">{selected}</span>
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
                {options.map((option, indx) => (
                  <Listbox.Option
                    key={indx}
                    className={({ active }) =>
                      cn(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-8 pr-4'
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={cn(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {option}
                        </span>

                        {selected ? (
                          <span
                            className={cn(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 left-0 flex items-center pl-1.5'
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
          </>
        )}
      </Listbox>
    </AbstractInput>
  )
}
