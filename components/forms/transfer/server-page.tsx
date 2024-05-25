"use server";
import { Route } from "next";
import TransferPrescriptions from "./client-form";
import { getUserProfileOrRedirect } from "@/app/actions/user/get";
import { redirect } from "next/navigation";

export default async function TransferPrescriptionsPage({successRedirectUrl}:{successRedirectUrl: Route<string>}) {
  const userWithProfile = await getUserProfileOrRedirect();
  if (!userWithProfile) {redirect('/login')}
  return <TransferPrescriptions userWithProfile={userWithProfile} successRedirectUrl={successRedirectUrl} />
}
    