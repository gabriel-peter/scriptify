"use client"
import { useState } from "react"
import FormModal from "../abstract-form-modal";
import InsuranceInputForm from "../insurance/form";

export default function InsuranceFormModal({ userId }: { userId: string }) {
    const [open, setOpen] = useState(false);
    return (
        <FormModal open={open} setOpen={setOpen} buttonName="Edit">
            <InsuranceInputForm userId={userId} successAction={() => setOpen(false)} />
        </FormModal>
    )
}