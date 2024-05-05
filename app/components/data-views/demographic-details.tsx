"use server"
import { getUserDemographicInformation } from '@/app/api/user-actions/actions'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import UpdateEmailForm from '../forms/single-input-forms/update-email-form'
import UpdateNameForm from '../forms/single-input-forms/update-name.form'
import UpdatePasswordForm from '../forms/single-input-forms/update-password'
import ChangableProfilePhoto from './changeable-profile-photo'
import UpdatDateOfBirthForm from '../forms/single-input-forms/update-date-of-birth'
import { toHumanReadableDate } from '@/utils/time'

export default async function DemographicInfoView(
    // {profile}: {profile: Tables<"profiles"> & {email: string} | null}
) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { redirect("/login") }
    const { data } = await getUserDemographicInformation()
    const profile = { ...data, email: user.email }
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
                    <div className="pt-6 sm:flex">
                        <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Language Preference</dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="text-gray-900">English</div>
                            <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                Update
                            </button>
                        </dd>
                    </div>
                    <UpdatDateOfBirthForm value={toHumanReadableDate(
                        {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        },
                        profile.date_of_birth
                    )} />
                    {/* <Switch.Group as="div" className="flex pt-6">
                  <Switch.Label as="dt" className="flex-none pr-6 font-medium text-gray-900 sm:w-64" passive>
                    Automatic timezone
                  </Switch.Label>
                  <dd className="flex flex-auto items-center justify-end">
                    <Switch
                    //   checked={automaticTimezoneEnabled}
                    //   onChange={setAutomaticTimezoneEnabled}
                      className={cn(
                        true ? 'bg-indigo-600' : 'bg-gray-200',
                        'flex w-8 cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          true ? 'translate-x-3.5' : 'translate-x-0',
                          'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                        )}
                      />
                    </Switch>
                  </dd>
                </Switch.Group> */}
                </dl>
            </div>
        </div>
    )
}

