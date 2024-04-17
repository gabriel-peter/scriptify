import AbstractInput from "./abstract-input";
import { inputStyling } from "./styling";

export default function EmailInput({ errorState, label }: { errorState: string[] | undefined, label: string }) {
    return (
        <div className="sm:col-span-4">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <AbstractInput error={errorState} errorMessage="Invalid Email.">
                <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={inputStyling}
                />
            </AbstractInput>
        </div>
    )
}