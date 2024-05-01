"use server";

import { createClient } from "@/utils/supabase/server";
import TransferPrescriptions from "./client-form";

export default async function TransferPrescriptionsPage({successRedirectUrl}:{successRedirectUrl: string}) {
    const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return <div>NO USER :(</div>
  }
  return <TransferPrescriptions userId={user.id} successRedirectUrl={successRedirectUrl} />
}
    