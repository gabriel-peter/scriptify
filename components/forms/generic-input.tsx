import { Field, Label } from "../catalyst-ui/fieldset";
import { Input } from "../catalyst-ui/input";
import InputError from "./abstract-input";

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
            <Label htmlFor={id}>
                {label}
            </Label>
            <InputError error={errorState} errorMessage={errorMessage}>
                <Input
                    type={type || "text"}
                    name={id}
                    id={id}
                    placeholder={placeholder || ""}
                />
            </InputError>
        </Field>
    );
}