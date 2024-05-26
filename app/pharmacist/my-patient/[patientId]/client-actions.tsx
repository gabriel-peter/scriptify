"use client"

import { assignPharmacistToPatient, removePharmacistPatientAssignment } from "@/app/actions/admin/assign-pharmacist"
import LoadingButton from "@/components/buttons/loading-button"
import BasicSpinner from "@/components/loading/basic-spinner"
import { Tables } from "@/types_db"
import { Route } from "next"
import { revalidatePath } from "next/cache"
import { redirect, usePathname, useRouter } from "next/navigation"
import { useState } from "react"

export function ClientActions({ patientId, pharmacistId, assignment }: { patientId: string, pharmacistId: string, assignment: Tables<'pharmacist_to_patient_match'>[] }) {
    const pathname = usePathname() as Route
    return (
        <div className="flex items-center gap-x-4 sm:gap-x-6">
            {
                assignment.length > 0 ?
                    <LoadingButton
                        title='Unassign to Me'
                        serverAction={() => removePharmacistPatientAssignment({ patientId, pharmacistId }, pathname)}
                    /> :
                    <LoadingButton
                        title='Assign to Me'
                        serverAction={() => assignPharmacistToPatient({ patientId, pharmacistId }, pathname)}
                    />
            }
        </div>
    )
}