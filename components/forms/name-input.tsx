import { inputStyling } from "./styling";
import AbstractInput from "./abstract-input";
import { Input } from "../catalyst-ui/input";
import { Field, Label } from "../catalyst-ui/fieldset";

export default function NameInput({ errorState }: { errorState: { firstName?: string[], lastName?: string[] } | undefined }) {
    return (
        <>
            <Field
            >
                <Label htmlFor="first-name"
                >
                    First name
                </Label>
                <AbstractInput error={errorState?.firstName} errorMessage="Invalid First Name.">
                    <Input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                    />
                </AbstractInput>
            </Field>

            <Field
            >
                <Label htmlFor="last-name"
                >
                    Last name
                </Label>
                <AbstractInput error={errorState?.lastName} errorMessage="Invalid Last Name.">
                    <Input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                    />
                </AbstractInput>
            </Field>
        </>
    )
}