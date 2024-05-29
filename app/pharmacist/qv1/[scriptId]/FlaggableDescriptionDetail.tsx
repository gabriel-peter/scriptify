"use client"
import { Badge } from "@/components/catalyst-ui/badge";
import { Button } from "@/components/catalyst-ui/button";
import { DescriptionDetails, DescriptionList, DescriptionTerm } from "@/components/catalyst-ui/description-list";
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from "@/components/catalyst-ui/dialog";
import { Divider } from "@/components/catalyst-ui/divider";
import { Dropdown } from "@/components/catalyst-ui/dropdown";
import { Field, Label } from "@/components/catalyst-ui/fieldset";
import { Select } from "@/components/catalyst-ui/select";
import { Textarea } from "@/components/catalyst-ui/textarea";
import { CustomSelect } from "@/components/forms/CustomSelect";
import BasicSpinner from "@/components/loading/basic-spinner";
import { cn } from "@/utils/cn";
import { FlagIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type ClientLoadState = "Loading" | "Success" | "Error" | "Idle"

const reasonForFlag = [
    '--', // TODO make this not submittable on validation
    'High/Low Dose',
    'Allergy',
    'Drug / Disease Interaction',
    'Severe Drug / Disease Interaction',
    'Unclear Directions / Requires Clarification',
    'Other'
];

export type FlagType = typeof reasonForFlag[number];

export function FlaggableDescriptionDetails(
    {
        name,
        value,
        flagValues,
        patientId,
        prescriptionId
    }: {
        name: string,
        value: string,
        flagValues?: { reasonValue: FlagType, explanation: string }
        patientId: string,
        prescriptionId: string
    }) {
    const [showFlagModal, setFlagModal] = useState(false)
    const [showRemoveFlagModal, setShowRemoveFlagModal] = useState(false)
    const [isFlagged, setIsFlagged] = useState(false)
    const [requestState, setRequestState] = useState<ClientLoadState>('Idle')

    async function upsertFlagforRx(formData: FormData) {
        setRequestState('Loading');
        const reason = formData.get('reason')
        const explanation = formData.get('explanation')

        setIsFlagged(true)
        setFlagModal(false)
        setRequestState('Success');

    }

    async function removeFlag() {
        setRequestState('Loading');

        setIsFlagged(false)
        setFlagModal(false)
        setRequestState('Success');

    }

    return (
        <>
            {/* Add Flag Modal */}
            <Dialog open={showFlagModal} onClose={setFlagModal}>
                <form action={upsertFlagforRx}>
                    <DialogTitle>{isFlagged ? 'Add' : 'Update'} Flag</DialogTitle>
                    <DialogDescription>
                        You flagged a detail:
                    </DialogDescription>
                    <DialogBody>

                        <DescriptionList>
                            <DescriptionTerm>{name}</DescriptionTerm>
                            <DescriptionDetails>{value}</DescriptionDetails>
                        </DescriptionList>
                        <Divider />
                        <CustomSelect
                            id={"reason"}
                            label={"Reason"}
                            presetValue={flagValues?.reasonValue}
                            options={reasonForFlag}
                            errorState={undefined}
                        />
                        <Field>
                            <Label>Explanation</Label>
                            <StatefulTextArea name='explanation' preset={flagValues?.explanation} />
                        </Field>

                    </DialogBody>
                    <DialogActions>
                        <Button plain onClick={() => setFlagModal(false)}>
                            Cancel
                        </Button>

                        {/* Remove button */}
                        {isFlagged &&
                            <Button onClick={() => removeFlag()}>
                                {requestState === 'Loading' && <BasicSpinner />}
                                Remove Flag
                            </Button>
                        }

                        <Button
                            disabled={requestState === 'Loading'}
                            type="submit"
                        >
                            {requestState === 'Loading' && <BasicSpinner />}
                            {isFlagged ? 'Update Flag' : 'Add Flag'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            {/* Detail Row */}
            <DescriptionDetails
                className={cn("flex justify-between relative group")}
            >
                {/* Value */}
                {isFlagged ? <Badge color="red">{value}</Badge> : value}

                {/* Reason for Flag */}
                {isFlagged && flagValues?.reasonValue}

                {/* Flag Button */}
                <Button
                    className={cn(isFlagged ? 'bg-red-500/50' : 'opacity-0 group-hover:opacity-100 transition-opacity duration-300', "mx-3")}
                    outline
                    onClick={() => setFlagModal(true)}
                >
                    <FlagIcon />
                    {isFlagged ? 'Remove Flag' : 'Flag'}
                </Button>
            </DescriptionDetails>
        </>
    )
}

// Necessary because presetting value on headlessui textarea will make it permanently disabled.
export default function StatefulTextArea({ preset, name }: { preset?: string, name: string }) {
    const [value, setValue] = useState<string | undefined>(preset)
    return (
        <Textarea
            value={value}
            onChange={v => setValue(v.target.value)}
            disabled={false}
            name={name}
            rows={3}
        />
    )
}