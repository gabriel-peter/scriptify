"use server"
import { checkPatientOnBoardingProgress } from '@/app/api/user-actions/check-on-boarding-progress';
import { redirect } from 'next/navigation'
import { ReactNode } from "react";

export default async function ForcePatientOnBoarding({children}: {children: ReactNode}) {
    const patientOnBoardingStatus = await checkPatientOnBoardingProgress()
    if (patientOnBoardingStatus.data !== null && patientOnBoardingStatus.data.personal_info) {
        return <>{children}</>
    } else {
        redirect('/patient/get-started/personal?error=mandatory_complete')
    }
}