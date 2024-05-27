"use client"
import { formatDateWithTimezoneOffset, localizedDate, toHumanReadableDate, toHumanReadableTime } from "@/utils/time"
import { ReactNode, useEffect, useState } from "react"
import { GetAppointmentForDayResponse, getAppointmentsForDay } from "../../../actions/appointment/get-appointments"
import { BasicList_Client } from "@/components/lists/basic-list-client"
import ProfilePhoto from "@/components/data-views/profile-photo"
import { stringifyName } from "@/utils/user-attribute-modifiers"
import { Text } from "@/components/catalyst-ui/text"
import { Heading } from "@/components/catalyst-ui/heading"

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
            case "Loading": return <Text>LOADING...</Text>;
            case "Success": return (
                <>
                    {!appointments || appointments.length === 0 ? <Text>No Appointments</Text> :
                        <BasicList_Client items={appointments} row={(appointment) => (
                            <>
                                <div className="flex min-w-0 gap-x-4">
                                    <ProfilePhoto size={40} userId={appointment.users.id} />
                                    <div className="min-w-0 flex-auto">
                                        <Text>{stringifyName(appointment.users?.profiles)}</Text>
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
            <Heading>
                Schedule for <time dateTime={formatDateWithTimezoneOffset(selectedDate)}>{localizedDate(selectedDate)}</time>
            </Heading>
            {componentBody()}
        </>
    )
}