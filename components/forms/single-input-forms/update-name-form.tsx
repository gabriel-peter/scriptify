"use client"
import updateName from "@/app/api/user-actions/update-name-action"
import { inputStyling } from "../styling"
import { UpdateRow } from "./base-single-line-form"
import { useRouter } from "next/navigation"


export default function UpdateNameForm({ value, userId }: { value: string, userId: string }) {
    const router = useRouter()
    return <UpdateRow
        title="Full Name" value={value}
        updateAction={updateName.bind(null, userId)}
        successAction={router.refresh}
        alertDetails={{ title: "Name Update Successful", description: "" }}
    >
        <input
            type="text"
            name="first-name"
            id="first-name"
            autoComplete="first-name"
            placeholder="First Name"
            className={inputStyling}
        />
        <input
            type="text"
            name="last-name"
            id="last-name"
            autoComplete="last-name"
            placeholder="Last Name"
            className={inputStyling}
        />
    </UpdateRow>
}