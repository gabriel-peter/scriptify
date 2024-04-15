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
                className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="+1 (555) 987-6543"
            />
        </div>
    )
}