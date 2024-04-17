import { validatedFieldsType } from "@/app/api/patient-get-started/personal-patient-form-handler";
import { inputStyling } from "./styling";
import AbstractInput from "./abstract-input";

export default function NameInput({errorState}: {errorState: validatedFieldsType | undefined}) {
    return (
        <>
            <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                    First name
                </label>
                <AbstractInput error={errorState?.firstName} errorMessage="Invalid First Name.">
                    <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className={inputStyling}                    />
                </AbstractInput>
            </div>

            <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Last name
                </label>
                <AbstractInput error={errorState?.lastName} errorMessage="Invalid Last Name.">
                    <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className={inputStyling}                    />
                </AbstractInput>
            </div>
        </>
    )
}