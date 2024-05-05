'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { AuthError, SupabaseClient, User } from '@supabase/supabase-js'
import { Database } from '@/types_db'

export async function login(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.log(error.name, error.message, error.cause)
    redirect(`/login?error=${handleErrorMessage(error)}`)
  }

  revalidatePath('/', 'layout')
  redirect('/my-dashboard/patient')
}

function handleErrorMessage(error: AuthError) {
  // Errors to handle:
  // - AuthApiError: Email not confirmed
  // - AuthApiError: Email rate limit exceeded
  // - AuthApiError: Invalid login credentials
  switch (error.message) {
    case "Invalid login credentials": return "invalid_credentials"
    case "Email not confirmed": return "email_not_confirmed"
    case "Email rate limit exceeded": return "server_error"
    default: return "unknown"
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
        account_type: formData.get("account-type")
      }
    }
  }

  const { error, data: { user } } = await supabase.auth.signUp(data)
  // if (user) {
  //   createUserProfile(supabase, user);
  // }

  if (error) {
    console.log(error)
    redirect('/error')
  }

  revalidatePath('/*', 'layout')
  if (user?.user_metadata["account_type"] === 'Pharmacist') {
    redirect("/get-started/pharmacist/personal")
  } else if (user?.user_metadata["account_type"] === 'Patient') {
    redirect("/get-started/patient/personal")
  } else {
    throw new Error("Error")
  }
}

// async function createUserProfile(supabase: SupabaseClient<Database>, user: User) {
//   return await supabase.from('profiles').insert({
//     id: user.id
//   });
// }
