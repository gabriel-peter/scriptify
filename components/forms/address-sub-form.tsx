import { states } from "@/app/actions/options";
import InputError from "./abstract-input";
import CustomDropdown, { NativeDropdown } from "./dropdown";
import { CustomSelect } from './CustomSelect';
import { inputStyling } from "./styling";
import { Database } from "@/types_db";
import { Field, FieldGroup, Fieldset, Label } from "../catalyst-ui/fieldset";
import { Input } from "../catalyst-ui/input";


export default function AddressSubForm({ errorState }: {
    errorState?:
    { streetAddress?: string[], city?: string[], region?: string[], postalCode?: string[] }
}) {
    return (
        <>
            <Fieldset>
                <FieldGroup>
                <Field>
                <Label htmlFor="street-address" 
                // className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Street address
                </Label>
                <InputError error={errorState?.streetAddress}>
                    <Input
                        type="text"
                        name="street-address"
                        id="street-address"
                        autoComplete="street-address"
                        // className={inp/utStyling}
                    />
                </InputError>
                <Label htmlFor="street-address" 
                // className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Street address 2
                </Label>
                <InputError error={errorState?.streetAddress}>
                    <Input
                        type="text"
                        name="street-address-2"
                        id="street-address-2"
                        autoComplete="street-address"
                        // className={inputStyling}
                    />
                </InputError>
            </Field>
            </FieldGroup>

            <FieldGroup>
                
            {/* <div className="sm:col-span-2 sm:col-start-1"> */}
            <Field>
                <Label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                    City
                </Label>
                <InputError error={errorState?.city}>
                    <Input
                        type="text"
                        name="city"
                        id="city"
                        autoComplete="address-level2"
                        // className={inputStyling} 
                        />
                </InputError>
                </Field>
            {/* </div> */}

            <div className="sm:col-span-2">
                <CustomSelect label="State" id='state' options={states} errorState={errorState?.region}/>
            </div>

            <div className="sm:col-span-2">
                <Field>
                <Label htmlFor="postal-code" 
                // className="block text-sm font-medium leading-6 text-gray-900"
                >
                    ZIP / Postal code
                </Label>
                <InputError error={errorState?.postalCode} errorMessage="Invalid Postal Code.">
                    <Input
                        type="text"
                        name="postal-code"
                        id="postal-code"
                        autoComplete="postal-code"
                        // className={inputStyling}
                         />
                </InputError>
                </Field>
            </div>
            </FieldGroup>
            </Fieldset>
        </>
    )
}