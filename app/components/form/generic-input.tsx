import AbstractInput from "./abstract-input";
import { inputStyling } from "./styling";

export default function GenericInput({label, id, errorState, errorMessage}: {label: string, id: string, errorState: any | undefined, errorMessage: string}) {
    return (
    <div className="sm:col-span-3">
                <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
                    {label}
                </label>
                <AbstractInput error={errorState} errorMessage={errorMessage}>
                    <input
                        type="text"
                        name={id}
                        id={id}
                        className={inputStyling}                    
                        />
                </AbstractInput>
            </div>
    );
}