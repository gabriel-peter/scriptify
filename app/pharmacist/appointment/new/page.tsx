"use server"
import PageContainer from "@/components/containers/page-container";
import { createClient } from "@/utils/supabase/server";
import { stringifyName } from "@/utils/user-attribute-modifiers";
import { redirect } from "next/navigation";
import NewAppointmentScheduler from "./new-appointment-scheduler";
import { Heading } from "@/components/catalyst-ui/heading";

export default async function PharmacistNewAppointmentPage({
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
    const patientId = searchParams['userId'] as string
    const {data, error} = await createClient().from('users').select('profiles!inner(first_name,last_name)').eq('id', patientId).single()
    if (!data) {
        console.error(error)
        redirect('/error')
    }
    const getPharmacist = await createClient().auth.getUser()
    if (!getPharmacist.data.user || getPharmacist.error) {
        console.error(error)
        redirect('/login')
    }
    const pharmacist = getPharmacist.data.user

    return (
        <PageContainer>
            <Heading>Schedule an appointment for <strong>{stringifyName(data.profiles)}</strong></Heading>
            <NewAppointmentScheduler pharmacistId={pharmacist.id} patientId={patientId}/>
        </PageContainer>
    )
}