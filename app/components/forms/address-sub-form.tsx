import AbstractInput from "./abstract-input";
import { FieldErrors } from "./personal-information/personal-form-handler";
import { inputStyling } from "./styling";

export default function AddressSubForm({ errorState }: { errorState: FieldErrors | undefined }) {
    return (
        <>
            <div className="col-span-full">
                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                    Street address
                </label>
                <AbstractInput error={errorState?.streetAddress} errorMessage="Invalid Email.">
                    <input
                        type="text"
                        name="street-address"
                        id="street-address"
                        autoComplete="street-address"
                        className={inputStyling}
                    />
                </AbstractInput>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                    City
                </label>
                <AbstractInput error={errorState?.city} errorMessage={"Invalid Email."}>
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
                <AbstractInput error={errorState?.region} errorMessage="Invalid Email.">
                    <input
                        type="text"
                        name="region"
                        id="region"
                        autoComplete="address-level1"
                        className={inputStyling} />
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