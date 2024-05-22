"use client"
import FailedSubmission from "@/components/alerts/failed-submit-alert"
import { useSearchParams } from "next/navigation"

export enum LoginError {
  invalid_credentials = "invalid_credentials",
  email_not_confirmed = "email_not_confirmed",
  server_error = "server_error",
  user_already_registered = "user_already_registered",
  unknown = "unknown"
}

function convertErrorParam(errorParam: LoginError | null) {
  if (!errorParam) return ""
  switch (errorParam) {
    case LoginError.invalid_credentials: return "Invalid login credentials"
    case LoginError.email_not_confirmed: return "Email not confirmed you need to confirm your email, check your inbox"
    case LoginError.unknown:
    case LoginError.server_error: return "Unknown Error occured in our system."
    case LoginError.user_already_registered: return "There is already a user registered under that email."
    default:
      const exhaustiveCheck: never = errorParam; // This will throw Typescript error if switch is not exhaustive :)
      throw new Error(`Unhandled color case: ${exhaustiveCheck}`);
  }
}

export function ErrorBanner() {
  const searchParams = useSearchParams()
  const errorParam = searchParams.get("error") as LoginError | null
  if (!errorParam) { return <></> }
  return <FailedSubmission title="Error occurred while logging in" errorList={[convertErrorParam(errorParam)]} />
}
