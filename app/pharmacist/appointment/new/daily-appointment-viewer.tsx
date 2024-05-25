"use client"

import { formatDateWithTimezoneOffset, localizedDate, toHumanReadableDate, toHumanReadableTime } from "@/utils/time"
import { ReactNode, useEffect, useState } from "react"
import { GetAppointmentForDayResponse, getAppointmentsForDay } from "../../../actions/appointment/get-appointments"
import { BasicList_Client } from "@/components/lists/basic-list-client"
import ProfilePhoto from "@/components/data-views/profile-photo"
import { stringifyName } from "@/utils/user-attribute-modifiers"

type ClientLoadState = "Loading" | "Success" | "Error"

export function AppointmentViewer({ selectedDate, pharmacistId }: { selectedDate: Date, pharmacistId: string }) {
    console.log(selectedDate, selectedDate.toISOString())
    const [appointments, setAppointments] = useState<GetAppointmentForDayResponse['data']>(null);
    const [clientState, setClientState] = useState<ClientLoadState>('Loading');
    useEffect(() => {
        setClientState('Loading')
        getAppointmentsForDay(selectedDate.toISOString(), pharmacistId)
            .then((res) => {
                if (res.error) {
                    console.error(res.error)
                    setClientState('Error')
                } else {
                    setAppointments(res.data)
                    setClientState('Success')
                }
            })
    }, [selectedDate])


    function componentBody() {
        switch (clientState) {
            case "Loading": return "LOADING...";
            case "Success": return (
                <>
                    {!appointments || appointments.length === 0 ? <>No Appointments</> :
                        <BasicList_Client items={appointments} row={(appointment) => (
                            <>
                                <div className="flex min-w-0 gap-x-4">
                                    <ProfilePhoto size={40} userId={appointment.users.id} />
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">{appointment.users.profiles.first_name + " " + appointment.users.profiles.last_name}</p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{appointment.users.email}</p>
                                    </div>
                                </div>
                                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                        Time:
                                        {' '}
                                        <time dateTime={appointment.start_time}>{toHumanReadableDate({ hour: 'numeric', minute: 'numeric' }, appointment.start_time, true)}</time>
                                       {' '}
                                        -
                                        {' '}
                                        <time dateTime={appointment.end_time}>{toHumanReadableDate({ hour: 'numeric', minute: 'numeric' }, appointment.end_time, true)}</time>
                                    </p>
                                </div>
                            </>
                        )} />
                    }
                </>
            )
            case "Error": return 'ERROR'

        }
    }

    return (
        <>
            <h2 className="text-base font-semibold leading-6 text-gray-900">
                Schedule for <time dateTime={formatDateWithTimezoneOffset(selectedDate)}>{localizedDate(selectedDate)}</time>
            </h2>
            {componentBody()}
        </>
    )
}


{/* <h2 className="text-base font-semibold leading-6 text-gray-900">
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
                </ol> */}