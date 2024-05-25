"use client"
import { useRouter } from "next/navigation"
import { UpdateRow } from "./base-single-line-form"
import updateDateOfBirth from "@/app/actions/user/update-date-of-birth-action"
import { langaugePreferences } from "@/app/actions/options"
import updateLanguage from "@/app/actions/user/update-language-action"

export default function UpdateLanguageForm({ value }: { value: string }) {
    const router = useRouter()
    return <UpdateRow
        title='Language'
        value={value}
        updateAction={updateLanguage}
        successAction={router.refresh}
        alertDetails={{
            title: "Langauge Update",
            description: ""
        }}>
        <select
            id="language"
            name="language"
            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
            {Object.keys(langaugePreferences).filter(k => Number.isNaN(+k)).map((e) => <option key={e}>{e}</option>)}
        </select>
    </UpdateRow>
}