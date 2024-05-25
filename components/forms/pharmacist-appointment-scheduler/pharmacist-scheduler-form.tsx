'use client'
import { useFormState } from "react-dom";
import AbstractForm from "../abstract-form-full-page"
import { scheduleAppointment } from "./pharmacist-scheduler-form-handler";
import { FormSubmissionReturn, Status } from "../../../app/actions/validation-helpers";
import CustomDropdown from "../dropdown";
import GenericInput from "../generic-input";
import { generateTimeOptions, localizedDate } from "@/utils/time";
import { ReactNode } from "react";

export default function PharmacistSchedulerForm({ pharmacistId, patientId, date, successMessage}: { pharmacistId: string, patientId: string, date: Date, successMessage: (x: FormSubmissionReturn<any>) => ReactNode }) {
    const scheduleAppointmentWithIds = scheduleAppointment.bind(null, { patientId, pharmacistId, meetingDate: date });
    const [state, formAction] = useFormState(scheduleAppointmentWithIds, { status: Status.NOT_SUBMITTED })

    return (
        <>
            {state.status === Status.SUCCESS ?
                (<>
                    {successMessage(state)}
                </>
                ) : (
                    <AbstractForm
                        formAction={formAction}
                        state={state}
                        header={`Schedule an appointment on ${localizedDate(date)}`}
                        successAction={() => {}}
                    >
                        <GenericInput label="Meeting Reason" id='meeting-reason' errorState={state.error?.meetingReason} errorMessage={""} />
                        <CustomDropdown id={"duration"} label={"Durations (minutes)"} options={[15, 30, 45, 60]} errorState={state.error?.duration} />
                        <CustomDropdown id={"start-time"} label={"Start Time"} options={generateTimeOptions('09:00', 15, 17)} errorState={state.error?.startTime} />
                    </AbstractForm>
                )}
        </>

    )
}