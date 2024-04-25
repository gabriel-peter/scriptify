'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { SupabaseClient, User } from '@supabase/supabase-js'
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

  console.log(error)
  // Errors to handle:
  // - AuthApiError: Email not confirmed
  // - AuthApiError: Email rate limit exceeded
  // - AuthApiError: Invalid login credentials
  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/account')
}

export async function signup(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error, data: {user} } = await supabase.auth.signUp(data)
  if (user) {
    createUserProfile(supabase, user);
  }

  if (error) {
    console.log(error)
    redirect('/error')
  }

  revalidatePath('/*', 'layout')
  redirect("/get-started")
}

async function createUserProfile(supabase: SupabaseClient<Database>, user: User) {
  return await supabase.from('profiles').insert({
    id: user.id
  });
}
