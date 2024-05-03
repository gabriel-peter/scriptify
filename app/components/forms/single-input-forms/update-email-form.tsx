"use client"
import updateEmail from "@/app/api/user-actions/email-update-action";
import { UpdateRow } from "./base-single-line-form";


export default function UpdateEmailForm({value}:{value: string}) {
    return <UpdateRow title={'Email Address'} value={value} updateAction={updateEmail}/>
}