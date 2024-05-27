"use server"
import { createClient } from "@/utils/supabase/server";
import SavedCreditCard from "@/components/data-views/credit-card-details";
import MedicalInsuranceInfo from "@/components/data-views/insurance-details";
import { getUserInsuranceInformation, getUserOrRedirect, getUserPaymentInformation } from "../actions/user/get";
import DemographicInfoView from "@/components/data-views/demographic-details";
import ChangableProfilePhoto from "@/components/data-views/changeable-profile-photo";
import { Database } from "@/types_db";
import { SupabaseClient, User } from "@supabase/supabase-js";
import { ACCOUNT_TYPE } from "@/utils/enums";
import { ReactNode } from "react";
import PageContainer from "@/components/containers/page-container";

export default async function SettingsPage() {
    const user = await getUserOrRedirect()

    function getAccountTypePanels(user: User): ReactNode {
        switch(user.user_metadata['account_type'] as ACCOUNT_TYPE) {
            case ACCOUNT_TYPE.PATIENT: return patientInfo(user)
            case ACCOUNT_TYPE.PHARMACIST: return pharmacistInfo(user)
        }
    }

    return (
        <PageContainer>
            <DemographicInfoView /> {/* Applicable to all acouunt types */}
            {/* {getAccountTypePanels(user)} */}
        </PageContainer>
    )
}

async function patientInfo(user: User) {
    const [ccDetails, insurance] = await Promise.all([
        getUserPaymentInformation(user.id),
        getUserInsuranceInformation(user.id)
    ])
    return (
        <>
            <SavedCreditCard userId={user.id} ccDetails={ccDetails} />
            <MedicalInsuranceInfo userId={user.id} insurance={insurance} />
        </>
    )
}

async function pharmacistInfo(user: User) {
    return (
        <>
            TODO
        </>
    )
}