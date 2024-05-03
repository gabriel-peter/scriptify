import GenericInput from "../forms/generic-input";
import NameInput from "../forms/name-input";

export default function MedicalInsuranceInput({ errorState }: { errorState: {
    insuranceName?: string[], insuranceId?: string[], rxGroup?: string[], bin?: string[], ssn?: string[], insuranceNumber?: string[], pcn?: string[]
    firstName?: string[], lastName?: string[]
} | undefined }) {
    return (
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <NameInput errorState={errorState} />
            <div className="sm:col-span-2 sm:col-start-1">
                <GenericInput label={"Insurance Name:"} id={"insurance-name"} errorState={errorState?.insuranceName} errorMessage={"Invalid Name."} />
            </div>
            <div className="sm:col-span-2">
                <GenericInput label={"Insurance ID #:"} id={"insurance-id"} errorState={errorState?.insuranceId} errorMessage={"Invalid ID."} />
            </div>
            <div className="sm:col-span-2">
                <GenericInput label={"RX Group #:"} id={"rx-group"} errorState={errorState?.rxGroup} errorMessage={"Invalid RX Group."} />
            </div>
            <GenericInput label={"BIN:"} id={"bin"} errorState={errorState?.bin} errorMessage={"Invalid BIN."} />
            <GenericInput label={"PCN:"} id={"pcn"} errorState={errorState?.pcn} errorMessage={"Invalid PCN."} />
            <GenericInput label={"Insurance #:"} id={"insurance-number"} errorState={errorState?.insuranceNumber} errorMessage={"Invalid Insurance #."} />
            <GenericInput label={"SSN:"} id={"ssn"} errorState={errorState?.ssn} errorMessage={"Invalid SSN."} />
        </div>
    )
}