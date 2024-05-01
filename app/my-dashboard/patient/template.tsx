"use server"
import { redirect } from 'next/navigation'
import { ReactNode } from "react";
import checkOnBoardingProgress from '@/app/api/user-actions/check-on-boarding-progress';

export default async function ForcePatientOnBoarding({children}: {children: ReactNode}) {
    const patientOnBoardingStatus = await checkOnBoardingProgress()
    // if (patientOnBoardingStatus.data !== null && patientOnBoardingStatus.data.steps['complete']) {
        return <>{children}</>
    // } else {
    //     redirect('/get-started/patient/personal') // Todo add alert to why
    // }
}