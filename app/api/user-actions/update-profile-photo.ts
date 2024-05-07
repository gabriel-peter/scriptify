"use server"
import { FormSubmissionReturn, Status, StorageError, errorHandler } from "@/components/forms/validation-helpers";
import { createClient } from "@/utils/supabase/server";
import { getUserOrRedirect } from "./actions";
import { SupabaseClient, User } from "@supabase/supabase-js";
import { Database } from "@/types_db";


export default async function updateUserProfilePhoto(prevState: any, formData: FormData): Promise<FormSubmissionReturn<null>> {
    const supabase = createClient()
    const photo = formData.get("pfp-upload")
    if (!photo) { return { status: Status.ERROR, message: "File not Attached" } }
    const user = await getUserOrRedirect()
    return await supabase.storage.from("avatars").upload(`pfps/${user.id}`, photo, { upsert: true })
        .then(
            ({ error, data }) => {
                if (error) {
                    console.log("PFP Upload Error", error)
                    throw new StorageError(error.message)
                }
                return data
            }
        )
        .then((data) => saveNewAvatarUrl(supabase, data, user))
        .then(() => { return { status: Status.SUCCESS } })
        .catch(errorHandler<null>)
}

async function saveNewAvatarUrl(supabase: SupabaseClient<Database>, data: { path: string }, user: User) {
    return await supabase.from("profiles").update({
        avatar_url: data.path
    }).eq("id", user.id).throwOnError()
}