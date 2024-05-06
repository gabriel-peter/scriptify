"use client"
import { handleResetPasswordRequest } from "@/app/api/user-actions/password-reset-action";
import { inputStyling } from "../styling";
import { UpdateRow } from "./base-single-line-form";
import { useRouter } from "next/navigation";

export default function UpdatePasswordForm() {
    const router = useRouter()
    return (
        <UpdateRow
            title="Update Your Password" value={"***********"}
            updateAction={handleResetPasswordRequest}
            successAction={() => router.push("/login")}
            alertDetails={{ title: "Password Update Successful", description: "You will be logged-out, enter your new password" }}
        >
            <input
                type="password"
                name="old-password"
                id="old-password"
                autoComplete="password"
                placeholder="Current Password"
                className={inputStyling}
            />
            <input
                type="text"
                name="new-password"
                id="new-password"
                placeholder="New Password"
                className={inputStyling}
            />
        </UpdateRow>
    )
}