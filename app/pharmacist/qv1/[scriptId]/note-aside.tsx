'use client'

import { Button } from "@/components/catalyst-ui/button"
import { Field, Label } from "@/components/catalyst-ui/fieldset"
import { Subheading } from "@/components/catalyst-ui/heading"
import { Textarea } from "@/components/catalyst-ui/textarea"
import { ArrowDownCircleIcon, ArrowLeftCircleIcon, ArrowLeftEndOnRectangleIcon, ArrowRightCircleIcon, ArrowUpCircleIcon, CheckIcon } from "@heroicons/react/24/outline"
import { useState } from "react"


export default function NotesPanel() {
    const [isNoteVisible, setIsNoteVisible] = useState(false)
    return (
        <>
            <aside
                className={`fixed bg-opacity-100 bg-white dark:bg-zinc-950 border-4 border-gray-200 rounded-md left-0 bottom-0 w-full h-64 shadow-lg transform transition-transform ${isNoteVisible ? 'translate-y-0' : 'translate-y-full'
                    } z-50 p-4`}
            >
                <Field>
                    <Label>
                        Notes
                    </Label>
                    <div className="col-span-7">
                        <Textarea name="description" rows={5} />
                    </div>
                </Field>
                <div className="flex justify-between fixed bottom-4">
                    <Button
                        outline
                        className="left-0"
                        onClick={() => setIsNoteVisible(false)}
                    >
                        <ArrowDownCircleIcon />
                    </Button>
                    <Button
                        outline
                        className="right-0"
                        onClick={() => setIsNoteVisible(false)}
                    >
                        <CheckIcon />
                        Approve
                    </Button>
                </div>

            </aside>
            <div className="fixed bottom-4 left-4">
                <Button
                    outline
                    onClick={() => setIsNoteVisible(true)}
                >
                    <ArrowUpCircleIcon />
                </Button>
            </div>
        </>
    )
}