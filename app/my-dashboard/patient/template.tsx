"use server"
import { redirect } from 'next/navigation'
import { createClient } from "@/utils/supabase/server";
import { ReactNode } from "react";
import checkOnBoardingProgress from '@/app/get-started/patient/check-on-boarding-progress';

export default async function ForcePatientOnBoarding({children}: {children: ReactNode}) {
    const patientOnBoardingStatus = await checkOnBoardingProgress()
    if (patientOnBoardingStatus.data.steps['complete']) {
        return <>{children}</>
    } else {
        redirect('/get-started/patient/personal') // Todo add alert to why
    }
}