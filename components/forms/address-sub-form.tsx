import { states } from "@/app/api/patient-get-started/options";
import AbstractInput from "./abstract-input";
import { Dropdown } from "./dropdown";
import { inputStyling } from "./styling";
import { Database } from "@/types_db";


export default function AddressSubForm({ errorState }: {
    errorState?:
    { streetAddress?: string[], city?: string[], region?: string[], postalCode?: string[] }
}) {
    return (
        <>
            <div className="col-span-full">
                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                    Street address
                </label>
                <AbstractInput error={errorState?.streetAddress}>
                    <input
                        type="text"
                        name="street-address"
                        id="street-address"
                        autoComplete="street-address"
                        className={inputStyling}
                    />
                </AbstractInput>
                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                    Street address 2
                </label>
                <AbstractInput error={errorState?.streetAddress}>
                    <input
                        type="text"
                        name="street-address-2"
                        id="street-address-2"
                        autoComplete="street-address"
                        className={inputStyling}
                    />
                </AbstractInput>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                    City
                </label>
                <AbstractInput error={errorState?.city}>
                    <input
                        type="text"
                        name="city"
                        id="city"
                        autoComplete="address-level2"
                        className={inputStyling} />
                </AbstractInput>
            </div>

            <div className="sm:col-span-2">
                <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                    State / Province
                </label>
                <AbstractInput error={errorState?.region}>
                    <select
                        id='state'
                        name='state'
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                        {states.map((e) => <option key={e}>{e}</option>)}
                    </select>
                </AbstractInput>
            </div>

            <div className="sm:col-span-2">
                <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                    ZIP / Postal code
                </label>
                <AbstractInput error={errorState?.postalCode} errorMessage="Invalid Postal Code.">
                    <input
                        type="text"
                        name="postal-code"
                        id="postal-code"
                        autoComplete="postal-code"
                        className={inputStyling} />
                </AbstractInput>
            </div>
        </>
    )
}