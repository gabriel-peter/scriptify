import { Field, Label } from "../catalyst-ui/fieldset";
import { Input } from "../catalyst-ui/input";
import AbstractInput from "./abstract-input";
import { inputStyling } from "./styling";

export default function GenericInput({
    label,
    id,
    errorState,
    errorMessage,
    type,
    placeholder
}: {
    label: string,
    id: string,
    errorState: any | undefined,
    errorMessage?: string,
    type?: string,
    placeholder?: string
}) {
    return (
        <Field>
            <Label htmlFor={id} >
            {/* className="block text-sm font-medium leading-6 text-gray-900"> */}
                {label}
            </Label>
            <AbstractInput error={errorState} errorMessage={errorMessage}>
                <Input
                    type={type || "text"}
                    name={id}
                    id={id}
                    placeholder={placeholder || ""}
                />
            </AbstractInput>
        </Field>
    );
}