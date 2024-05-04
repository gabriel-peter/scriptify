"use server";
import { Route } from "next";
import TransferPrescriptions from "./client-form";
import { getUserProfileOrRedirect } from "@/app/api/user-actions/actions";

export default async function TransferPrescriptionsPage({successRedirectUrl}:{successRedirectUrl: Route<string>}) {
  const userWithProfile = await getUserProfileOrRedirect();
  return <TransferPrescriptions userWithProfile={userWithProfile} successRedirectUrl={successRedirectUrl} />
}
    