"use client"
import { useRouter } from "next/navigation"
import { inputStyling } from "../styling"
import { UpdateRow } from "./base-single-line-form"
import updateDateOfBirth from "@/app/actions/user/update-date-of-birth-action"

export default function UpdatDateOfBirthForm({ value }: { value: string }) {
    const router = useRouter()
    return <UpdateRow 
    title='Date of Birth' 
    value={value} 
    updateAction={updateDateOfBirth}
    successAction={router.refresh}
     alertDetails={{
        title: "Date of Birth Updated",
        description: ""
    }}>
        <input
            type="date"
            name="date-of-birth"
            id="date-of-birth"
            autoComplete="bday-day bday-month bday-year"
            className={inputStyling}
        />
    </UpdateRow>
}