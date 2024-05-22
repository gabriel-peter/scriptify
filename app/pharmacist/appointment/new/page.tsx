"use server"

import SimpleCalendar from "@/components/calendars/small-calendar";
import { redirect } from "next/navigation";

export default async function NewAppointmentScheduler({
    params,
    searchParams,
  }: {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
  }) {
    if (!searchParams || !searchParams['userId']) {
        console.debug("Incorrect SearchParams Supplied.")
        redirect('/error')
    }
    const userId = searchParams['userId']

    
    return (
        <div>
            {userId}
            <SimpleCalendar />
        </div>
    )
}