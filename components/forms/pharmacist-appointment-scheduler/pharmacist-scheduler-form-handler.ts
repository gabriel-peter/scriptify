'use server'

import { start } from "repl";
import { asyncFieldValidation, CustomClientError, errorHandler, FormSubmissionReturn, Status } from "../validation-helpers";
import { date, TypeOf, z } from 'zod';
import { localizedDate } from "@/utils/time";
import { createClient } from "@/utils/supabase/server";
import moment from 'moment';

const scheduleAppointmentSchema = z.object({
    duration: z.string(),
    startTime: z.string(), // TODO cutom time check.
    meetingReason: z.string().min(1).max(50)
});

export type FieldErrors = z.inferFlattenedErrors<typeof scheduleAppointmentSchema>["fieldErrors"];


export async function scheduleAppointment({patientId, pharmacistId, meetingDate}: {patientId: string, pharmacistId: string, meetingDate: Date}, prevState: any, formData: FormData):
Promise<FormSubmissionReturn<FieldErrors>> {
    const fields = {
        duration: formData.get("duration"),
        startTime: formData.get("start-time"),
        meetingReason: formData.get("meeting-reason")
    }

    return await asyncFieldValidation(scheduleAppointmentSchema, fields)
    .then((validatedFields) => saveConflictFreeNewAppointment(validatedFields, {patientId, pharmacistId, meetingDate}))
    .then((validatedFields) => ({status: Status.SUCCESS, message: `Appointment Schedule confirmed for ${validatedFields.data.startTime} on ${localizedDate(meetingDate)}`}))
    .catch(errorHandler<FieldErrors>)
}

async function saveConflictFreeNewAppointment(validatedFields: z.SafeParseSuccess<TypeOf<typeof scheduleAppointmentSchema>>, arg1: { patientId: string; pharmacistId: string, meetingDate: Date}) {
    const client = createClient();

    const startDateTime = moment(`${arg1.meetingDate.toISOString()}`, 'YYYYYY-MM-DDTHH:mm:ss.sssZ').add(moment.duration(validatedFields.data.startTime))
    console.log('startDateTime', startDateTime)
    
    const endDateTime = startDateTime.add(validatedFields.data.duration, 'minute')
    console.log('endDateTime', endDateTime)
    
    const {data, count, error} = await client.from('appointments').select('*')
    .eq("pharmacist_id", arg1.pharmacistId)
    // https://supabase.com/docs/reference/javascript/rangeadjacent
    .lte('end_time', endDateTime.toISOString())
    .gte('start_time', startDateTime.toISOString())
    
    if (!error && data.length === 0) {
        await client.from('appointments').insert({
            patient_id: arg1.patientId,
            pharmacist_id: arg1.pharmacistId,
            duration_minutes: Number.parseInt(validatedFields.data.duration),
            start_time: startDateTime.toISOString(),
            end_time: endDateTime.toISOString()
        }).throwOnError()
        return validatedFields
    } else {
        console.log(data)
        console.error(error)
        throw new CustomClientError(`You have a meeting conflict on \n${data[0].start_time} - ${data[0].end_time}`) // return conflicting meeting(s)
    }
}
