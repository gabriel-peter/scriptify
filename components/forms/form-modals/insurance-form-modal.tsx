"use client"
import { ReactNode, useState } from "react"
import FormModal from "./abstract-form-modal";
import InsuranceInputForm from "../insurance/form";
import { useRouter } from "next/navigation";

export default function InsuranceFormModal({ userId, buttonName}: { userId: string, buttonName: string }) {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    return (
        <FormModal open={open} setOpen={setOpen} buttonName={buttonName}>
            <InsuranceInputForm userId={userId} successAction={() => {setOpen(false); router.refresh()}} />
        </FormModal>
    )
}