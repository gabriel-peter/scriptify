import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { ReactNode } from 'react'

export default async function ProtectedPage({children}: {children: ReactNode}) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return <>{children}</>
}