'use client'

import { ButtonDivider } from "@/components/action-divider"
import SimpleCalendar, { formatDateWithTimezoneOffset } from "@/components/calendars/small-calendar"
import FormModal from "@/components/forms/form-modals/abstract-form-modal"
import PharmacistSchedulerForm from "@/components/forms/pharmacist-appointment-scheduler/pharmacist-scheduler-form"
import { standardButtonStyling } from "@/components/forms/styling"
import { cn } from "@/utils/cn"
import { localizedDate } from "@/utils/time"
import { Menu, Transition } from "@headlessui/react"
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid"
import moment from "moment"
import { Fragment, useState } from "react"

export default function NewAppointmentScheduler({ pharmacistId, patientId }: { pharmacistId: string, patientId: string }) {
    const [selectedDate, setSelectedDate] = useState<string>(formatDateWithTimezoneOffset(new Date()))
    return (
        <>
            <SimpleCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            <MySchedule date={
                // This parses based on system timezone. otherwise it would be UTC with just new Date()
                moment(`${selectedDate}`).toDate()
            }
                pharmacistId={pharmacistId} patientId={patientId} />
        </>
    )
}

const meetings = [
    {
        id: 1,
        name: 'Leslie Alexander',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        start: '1:00 PM',
        startDatetime: '2022-01-21T13:00',
        end: '2:30 PM',
        endDatetime: '2022-01-21T14:30',
    },
    // More meetings...
]

// AI-Generated
export function generateTimeOptions(startTime: string, intervalMinutes: number, endTime: number) {
    const times: string[] = [];
    let currentTime = new Date(`1970-01-01T${startTime}:00`);

    while (currentTime.getHours() < endTime) {
        let hours = currentTime.getHours();
        let minutes = currentTime.getMinutes();

        // Format the hours and minutes to HH:MM
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        times.push(formattedTime);

        // Add interval
        currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes);
    }

    return times;
}

function MySchedule({ date, pharmacistId, patientId }: { date: Date, pharmacistId: string, patientId: string }) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <FormModal open={open} setOpen={setOpen}>
                <PharmacistSchedulerForm
                    pharmacistId={pharmacistId}
                    patientId={patientId}
                    date={date}
                    successMessage={(state) => (
                        <>
                            <p>{state.message}</p>
                            <br />
                            <button 
                            className={standardButtonStyling}
                            onClick={() => setOpen(false)}
                            >
                                Dismiss
                                </button>
                        </>
                    )}
                />
            </FormModal>
            <section className="mt-12">
                <h2 className="text-base font-semibold leading-6 text-gray-900">
                    Schedule for <time dateTime={formatDateWithTimezoneOffset(date)}>{localizedDate(date)}</time>
                </h2>
                <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
                    {meetings.map((meeting) => (
                        <li
                            key={meeting.id}
                            className="group flex items-center space-x-4 rounded-xl px-4 py-2 focus-within:bg-gray-100 hover:bg-gray-100"
                        >
                            <img src={meeting.imageUrl} alt="" className="h-10 w-10 flex-none rounded-full" />
                            <div className="flex-auto">
                                <p className="text-gray-900">{meeting.name}</p>
                                <p className="mt-0.5">
                                    <time dateTime={meeting.startDatetime}>{meeting.start}</time> -{' '}
                                    <time dateTime={meeting.endDatetime}>{meeting.end}</time>
                                </p>
                            </div>
                            <Menu as="div" className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100">
                                <div>
                                    <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
                                        <span className="sr-only">Open options</span>
                                        <EllipsisVerticalIcon className="h-6 w-6" aria-hidden="true" />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="#"
                                                        className={cn(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        Edit
                                                    </a>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="#"
                                                        className={cn(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        Cancel
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </li>
                    ))}
                </ol>
                <ButtonDivider action={() => setOpen(true)} text='Schedule Appointment' />
            </section>
        </>
    )
}
