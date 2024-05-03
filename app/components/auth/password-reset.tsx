"use client"

import { handleResetPasswordRequest } from "@/app/api/user-actions/password-reset-action"
import { createClient } from "@/utils/supabase/client"
import { useEffect } from "react"
import { useFormState } from "react-dom"

export default function PasswordReset() {
    /**
 * Step 1: Send the user an email to get a password reset token.
 * This email contains a link which sends the user back to your application.
 */
    const [state, formAction] = useFormState(handleResetPasswordRequest, null)


/**
* Step 2: Once the user is redirected back to your application,
* ask the user to reset their password.
*/
// useEffect(() => {
//  supabase.auth.onAuthStateChange(async (event, session) => {
//    if (event == "PASSWORD_RECOVERY") {
//      const newPassword = prompt("What would you like your new password to be?");
//      const { data, error } = await supabase.auth
//        .updateUser({ password: newPassword })

//      if (data) alert("Password updated successfully!")
//      if (error) alert("There was an error updating your password.")
//    }
//  })
// }, [])

return <>
<form action={formAction}>
<button type="submit">
    RESET PASSWORD
</button>
</form>
    </>
}