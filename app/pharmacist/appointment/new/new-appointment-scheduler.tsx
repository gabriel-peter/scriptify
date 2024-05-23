'use client'

import { ButtonDivider } from "@/components/action-divider"
import SimpleCalendar from "@/components/calendars/small-calendar"
import FormModal from "@/components/forms/form-modals/abstract-form-modal"
import PharmacistSchedulerForm from "@/components/forms/pharmacist-appointment-scheduler/pharmacist-scheduler-form"
import { standardButtonStyling } from "@/components/forms/styling"
import { cn } from "@/utils/cn"
import { formatDateWithTimezoneOffset, localizedDate } from "@/utils/time"
import { Menu, Transition } from "@headlessui/react"
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid"
import moment from "moment"
import { Fragment, useState } from "react"
import { AppointmentViewer } from "./daily-appointment-viewer"

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
                <AppointmentViewer selectedDate={date} pharmacistId={pharmacistId}/>
                <ButtonDivider action={() => setOpen(true)} text='Schedule Appointment' />
            </section>
        </>
    )
}
