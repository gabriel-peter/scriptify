"use client"
import { useState } from "react";
import FormModal from "./abstract-form-modal";
import PaymentForm from "../payment/form";
import { useRouter } from "next/navigation";

export default function PaymentFormModal({userId, buttonName}: {userId: string, buttonName: string}) {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    return (
        <FormModal open={open} setOpen={setOpen} buttonName={buttonName}>
            <PaymentForm userId={userId} successAction={() => { setOpen(false); router.refresh() } } />
        </FormModal>
    )
} 