import AbstractInput from "./abstract-input";
import { inputStyling } from "./styling";

export default function PhoneNumberInput({ errorState, label }: { errorState: string[] | undefined, label: string }) {
    return (
        <div className="sm:col-span-4">
            <label htmlFor="phone-number" className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <AbstractInput error={errorState} errorMessage="Invalid Email.">
            <input
                type="tel"
                name="phone-number"
                id="phone-number"
                className={inputStyling}
                placeholder="+1 555-987-6543"
            />
            </AbstractInput>
        </div>
    )
}