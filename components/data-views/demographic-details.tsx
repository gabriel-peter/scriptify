"use server"
import { getUserDemographicInformationCurrentUser } from '@/app/actions/user/get'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import UpdateEmailForm from '../forms/single-input-forms/update-email-form'
import UpdateNameForm from '../forms/single-input-forms/update-name-form'
import UpdatePasswordForm from '../forms/single-input-forms/update-password'
import ChangableProfilePhoto from './changeable-profile-photo'
import UpdatDateOfBirthForm from '../forms/single-input-forms/update-date-of-birth'
import { toHumanReadableDate } from '@/utils/time'
import UpdateLanguageForm from '../forms/single-input-forms/update-language-form'

export default async function DemographicInfoView() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { redirect("/login") }
    const result = await getUserDemographicInformationCurrentUser()
    if (!result || result.error) {
        redirect(`/get-started/${(user.user_metadata['account_type'] as string).toLowerCase()}/personal`) // TODO add query params of redirect explanation
    }
    console.log("RESULT", result)
    const profile = { ...result.data, email: user.email }
    return (
        <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
            <div>
                <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                <p className="mt-1 text-sm leading-6 text-gray-500">
                    This information will be displayed publicly so be careful what you share.
                </p>

                <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                    <UpdateNameForm value={`${profile?.first_name} ${profile?.last_name}`} userId={user.id} />
                    <UpdateEmailForm value={profile.email!} />
                    <UpdatePasswordForm />
                    <ChangableProfilePhoto />
                </dl>
            </div>
            <div>
                <h2 className="text-base font-semibold leading-7 text-gray-900">Clinical Preferences</h2>
                <p className="mt-1 text-sm leading-6 text-gray-500">
                    Choose what language and date format to use throughout your account.
                </p>

                <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                <UpdateLanguageForm value={"ENGLISH"}/>
                    <UpdatDateOfBirthForm value={toHumanReadableDate(
                        {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        },
                        profile.date_of_birth
                    )} />
                </dl>
            </div>
        </div>
    )
}

