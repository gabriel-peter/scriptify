"use server"
export default async function PatientViewPage({params}: {params: {id: string}}) {
    return (<>{params.id}</>)
}