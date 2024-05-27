'use server'

import { Button } from "@/components/catalyst-ui/button";
import { DescriptionDetails, DescriptionList, DescriptionTerm } from "@/components/catalyst-ui/description-list";
import { Divider } from "@/components/catalyst-ui/divider"
import { Field, Label } from "@/components/catalyst-ui/fieldset";
import { Heading, Subheading } from "@/components/catalyst-ui/heading"
import { Text } from "@/components/catalyst-ui/text";
import { Textarea } from "@/components/catalyst-ui/textarea";
import { createClient } from "@/utils/supabase/server"
import { computeAge, stringifyName } from "@/utils/user-attribute-modifiers";
import { ArrowLeftEndOnRectangleIcon, FlagIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import { redirect } from "next/navigation";
import { Suspense } from "react";

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

            <aside
                className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform ${isNoteVisible ? 'translate-x-0' : 'translate-x-full'
                    } z-50 p-4`}
            >
                <Button
                    // onClick={toggleNote} 
                    className="mt-4">
                    <ArrowLeftEndOnRectangleIcon />
                </Button>
                <Field>
                    <Label>Notes</Label>
                    <div className="col-span-7">
                        <Textarea name="description" rows={5} />
                    </div>
                </Field>

            </aside>

            <div className="flex-1 p-4">
                <Heading>Script Verification</Heading>
                <Divider />
                <div className="my-6 grid grid-cols-2">
                    <div>
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
                    </div>
                    <div>
                        <Subheading>Drug Details</Subheading>
                        <DescriptionList>
                            <DescriptionTerm>Name</DescriptionTerm>
                            <DescriptionDetails>{prescription.name}</DescriptionDetails>
                            <DescriptionTerm >Label</DescriptionTerm>
                            <DescriptionDetails>{prescription.label}</DescriptionDetails>
                            <DescriptionTerm>NDC</DescriptionTerm>
                            <DescriptionDetails className="flex justify-between relative group">
                                {prescription.ndc}
                                <Button className="mx-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" outline>
                                    <FlagIcon />
                                </Button>
                            </DescriptionDetails>
                        </DescriptionList>
                    </div>
                </div>

                <Heading>Other Medications</Heading>
                <Divider/>
                <Suspense fallback={<Subheading>Loading...</Subheading>}>
                    <OtherMedicationsForPatient patientId={prescription.patient_id} excludeCurrentPrescriptionId={prescription.id} />
                </Suspense>

            </div>
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
                    <DescriptionDetails>{prescription.name}</DescriptionDetails>
                    <DescriptionTerm >Label</DescriptionTerm>
                    <DescriptionDetails>{prescription.label}</DescriptionDetails>
                    <DescriptionTerm>NDC</DescriptionTerm>
                    <DescriptionDetails className="flex justify-between relative group">
                        {prescription.ndc}
                        <Button className="mx-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" outline>
                            <FlagIcon />
                        </Button>
                    </DescriptionDetails>
                </DescriptionList>
            ))}
        </>

    )

}