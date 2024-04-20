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
    errorMessage: string,
    type?: string,
    placeholder?: string
}) {
    return (
        <div className="sm:col-span-3">
            <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <AbstractInput error={errorState} errorMessage={errorMessage}>
                <input
                    type={type || "text"}
                    name={id}
                    id={id}
                    placeholder={placeholder || ""}
                    className={inputStyling}
                />
            </AbstractInput>
        </div>
    );
}