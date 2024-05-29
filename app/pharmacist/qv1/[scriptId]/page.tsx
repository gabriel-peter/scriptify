'use server'

import { DescriptionDetails, DescriptionList, DescriptionTerm } from "@/components/catalyst-ui/description-list";
import { Divider } from "@/components/catalyst-ui/divider"
import { Heading, Subheading } from "@/components/catalyst-ui/heading"
import { Text } from "@/components/catalyst-ui/text";
import { createClient } from "@/utils/supabase/server"
import { computeAge, stringifyName } from "@/utils/user-attribute-modifiers";
import moment from "moment";
import { redirect } from "next/navigation";
import { Suspense, useState } from "react";
import NotesPanel from "./note-aside";
import { FlaggableDescriptionDetails } from "./FlaggableDescriptionDetail";


export default async function InspectPrescription({ params }: { params: { scriptId: string } }) {
    const result = await createClient().from('prescriptions')
        .select('*,users!inner(*,profiles!inner(*))')
        .eq('id', params.scriptId)
        .single();
    if (!result.data) {
        console.log(result.error)
        redirect('/error')
    }
    const isNoteVisible = true;
    const prescription = result.data;
    const user = prescription.users;
    return (
        <div className="relative flex min-h-screen">
            <div className="flex-1 p-4">
                <Heading>Script Verification</Heading>
                <Divider />
                {/* <div className="my-6 grid grid-cols-2">
                    <div> */}
                        <Subheading>Patient Details</Subheading>
                        <DescriptionList>
                            <DescriptionTerm>Full name</DescriptionTerm>
                            <DescriptionDetails>{stringifyName(user.profiles)}</DescriptionDetails>
                            <DescriptionTerm>Age</DescriptionTerm>
                            <DescriptionDetails>{moment(user.profiles?.date_of_birth).format("MMMM Do YYYY")} ({computeAge(user.profiles?.date_of_birth)} years old)</DescriptionDetails>
                            <DescriptionTerm>Sex</DescriptionTerm>
                            <DescriptionDetails>{user.profiles?.sex}</DescriptionDetails>
                            <DescriptionTerm>Ethnicity</DescriptionTerm>
                            <DescriptionDetails>Caucasian</DescriptionDetails>
                        </DescriptionList>
                    {/* </div>
                    <div> */}
                        <Subheading>Drug Details</Subheading>
                        <DescriptionList>

                            <DescriptionTerm>Name</DescriptionTerm>
                            <FlaggableDescriptionDetails name='NAME' flagValues={{explanation: "YUH", reasonValue: "--"}} value={prescription.name} />

                            <DescriptionTerm >Label</DescriptionTerm>
                            <FlaggableDescriptionDetails name='LABEL' value={prescription.label} />

                            <DescriptionTerm>NDC</DescriptionTerm>
                            <FlaggableDescriptionDetails name='NDC' value={prescription.ndc} />

                            <DescriptionTerm>DOSAGE</DescriptionTerm>
                            <FlaggableDescriptionDetails name='DOSAGE' value={prescription.dosage} />

                        </DescriptionList>
                    {/* </div>
                </div> */}

                <Heading>Other Medications</Heading>
                <Divider />
                <Suspense fallback={<Subheading>Loading...</Subheading>}>
                    <OtherMedicationsForPatient patientId={prescription.patient_id} excludeCurrentPrescriptionId={prescription.id} />
                </Suspense>

            </div>
            <NotesPanel />
        </div>
    )
}



export async function OtherMedicationsForPatient(
    { patientId, excludeCurrentPrescriptionId }:
        { patientId: string, excludeCurrentPrescriptionId: string }
) {
    const result = await createClient().from('prescriptions')
        .select("*")
        .eq('patient_id', patientId)
        .neq('id', excludeCurrentPrescriptionId);

    if (!result.data) {
        return (<Text>No Results</Text>)
    }
    const prescriptions = result.data;
    return (
        <>
            {prescriptions.map(prescription => (
                <DescriptionList>
                    <DescriptionTerm>Name</DescriptionTerm>
                    <FlaggableDescriptionDetails name="Name" value={prescription.name} />

                    <DescriptionTerm >Label</DescriptionTerm>
                    <FlaggableDescriptionDetails name="Label" value={prescription.label} />

                    <DescriptionTerm>NDC</DescriptionTerm>
                    <FlaggableDescriptionDetails name="NDC" value={prescription.ndc} />
                </DescriptionList>
            ))}
        </>

    )

}