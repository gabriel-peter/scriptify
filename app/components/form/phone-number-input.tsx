import { inputStyling } from "./styling";

export default function PhoneNumberInput({label}: {label: string}) {
    return (
        <div className="sm:col-span-4">
            <label htmlFor="phone-number" className="block text-sm font-medium leading-6 text-gray-900">
                Phone Number
            </label>
            <input
                type="text"
                name="phone-number"
                id="phone-number"
                className={inputStyling}
                placeholder="+1 (555) 987-6543"
            />
        </div>
    )
}