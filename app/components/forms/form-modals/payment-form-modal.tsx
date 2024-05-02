"use client"
import { useState } from "react";
import FormModal from "./abstract-form-modal";
import PaymentForm from "../payment/form";

export default function PaymentFormModal({userId}: {userId: string}) {
    const [open, setOpen] = useState(false)
    return (
        <FormModal open={open} setOpen={setOpen} buttonName="Edit">
            <PaymentForm userId={userId} successAction={() => setOpen(false)} />
        </FormModal>
    )
} 