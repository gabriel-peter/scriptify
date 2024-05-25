"use client"
import updateEmail from "@/app/actions/user/email-update-action";
import { UpdateRow } from "./base-single-line-form";
import { inputStyling } from "../styling";
import { useRouter } from "next/navigation";


export default function UpdateEmailForm({ value }: { value: string }) {
    const router = useRouter()
    return <UpdateRow 
    title={'Email Address'} 
    value={value} 
    updateAction={updateEmail}
    successAction={router.refresh}
     alertDetails={{
        title: "Email Update Request Made",
        description: "Confirm your email change both in both your original email and new email inboxes."
    }}>
        <input
            type="text"
            name="new-email"
            id="new-email"
            autoComplete="email"
            className={inputStyling}
        />
    </UpdateRow>
}