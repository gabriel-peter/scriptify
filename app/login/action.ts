'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { AuthError } from '@supabase/supabase-js'
import { LoginError } from './error-handler'
import { ACCOUNT_TYPE } from '@/utils/enums'

export async function login(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error, data: { user } } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.log(error.name, error.message, error.cause)
    redirect(`/login?error=${handleErrorMessage(error)}`)
  }

  revalidatePath('/', 'layout')
  if (user?.user_metadata['account_type'] as ACCOUNT_TYPE === ACCOUNT_TYPE.PATIENT) {
    redirect('/patient/my-dashboard')
  } else {
    redirect('/pharmacist/my-dashboard')
  }
}

function handleErrorMessage(error: AuthError): LoginError {
  // Errors to handle:
  // - AuthApiError: Email not confirmed
  // - AuthApiError: Email rate limit exceeded
  // - AuthApiError: Invalid login credentials
  // - AuthApiError: User already registered
  switch (error.message) {
    case "Invalid login credentials": return LoginError.invalid_credentials
    case "Email not confirmed": return LoginError.email_not_confirmed
    case "Email rate limit exceeded": return LoginError.server_error
    case "User already registered": return LoginError.user_already_registered
    default: return LoginError.unknown
  }
}

export async function signup(formData: FormData) {
  const supabase = createClient()
  // TODO ZOD validation on signup
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        account_type: formData.get("account-type") as ACCOUNT_TYPE
      }
    }
  }

  const { error, data: { user } } = await supabase.auth.signUp(data)


  if (error) {
    console.error(error)
    redirect(`/sign-up?error=${handleErrorMessage(error)}`)
  } else if (!user) {
    redirect(`/sign-up?error=unknown}`)
  }

  console.log("User Created", user, user.user_metadata)

  revalidatePath('/*', 'layout')
  if (user?.user_metadata["account_type"] as ACCOUNT_TYPE === ACCOUNT_TYPE.PHARMACIST) {
    try {
      await supabase.from("pharmacist_on_boarding_complete").insert({ user_id: user.id }).throwOnError()
    } catch (e) {
      console.error(e)
      redirect(`/sign-up?error=unknown`)
    }
    redirect("/pharmacist/get-started/personal")
  } else if (user?.user_metadata["account_type"] as ACCOUNT_TYPE === ACCOUNT_TYPE.PATIENT) {
    try {
      await supabase.from("patient_on_boarding_complete").insert({ user_id: user.id }).throwOnError()
    } catch (e) {
      console.error(e)
      redirect(`/sign-up?error=unknown`)
    }
    redirect("/patient/get-started/personal")
  } else {
    throw new Error("Error")
  }
}

// async function createUserProfile(supabase: SupabaseClient<Database>, user: User) {
//   return await supabase.from('profiles').insert({
//     id: user.id
//   });
// }
