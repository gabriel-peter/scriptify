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
import { Heading } from "@/components/catalyst-ui/heading"
import { Button } from "@/components/catalyst-ui/button"

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
                            <Heading>{state.message}</Heading>
                            <br />
                            <Button
                                // className={standardButtonStyling}
                                onClick={() => setOpen(false)}
                            >
                                Dismiss
                            </Button>
                        </>
                    )}
                />
            </FormModal>
            <section className="mt-12">
                <AppointmentViewer selectedDate={date} pharmacistId={pharmacistId} />
                <ButtonDivider action={() => setOpen(true)} text='Schedule Appointment' />
            </section>
        </>
    )
}
