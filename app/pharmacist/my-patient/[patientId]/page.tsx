"use server"

export default async function MyPatientPage({ params }: { params: { patientId: string } }) {
    return (
        <div>{params.patientId}</div>
    )
}