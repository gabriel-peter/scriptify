"use client"
import { Button } from "@/components/catalyst-ui/button";
import { createClient } from "@/utils/supabase/server";
import { addPrescriptions } from "./rx-seed";



export default function DebugButton() {
    return (
        <div className="fixed bottom-4 left-4">
            <Button onClick={() => addPrescriptions('9dd6be0a-0cf4-4040-8ba3-808953562bd9')}>Seed Rx</Button>
        </div>
    )
}