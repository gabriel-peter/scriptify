import { inputStyling } from "./styling";

export default function EmailInput({ label }: { label: string }) {
    return (
        <div className="sm:col-span-4">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <div className="mt-2">
                <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={inputStyling}
                />
            </div>
        </div>
    )
}