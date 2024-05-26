import { FieldGroup, Fieldset } from "../catalyst-ui/fieldset";
import GenericInput from "../forms/generic-input";
import NameInput from "../forms/name-input";

export default function MedicalInsuranceInput({ errorState }: {
    errorState: {
        insuranceName?: string[], insuranceId?: string[], rxGroup?: string[], bin?: string[], ssn?: string[], insuranceNumber?: string[], pcn?: string[]
        firstName?: string[], lastName?: string[]
    } | undefined
}) {
    return (
        <Fieldset>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4">
                <NameInput errorState={errorState} />
            </div>
            <GenericInput label={"Insurance Name:"} id={"insurance-name"} errorState={errorState?.insuranceName} errorMessage={"Invalid Name."} />
            <GenericInput label={"Insurance ID #:"} id={"insurance-id"} errorState={errorState?.insuranceId} errorMessage={"Invalid ID."} />
            <GenericInput label={"RX Group #:"} id={"rx-group"} errorState={errorState?.rxGroup} errorMessage={"Invalid RX Group."} />
            <GenericInput label={"BIN:"} id={"bin"} errorState={errorState?.bin} errorMessage={"Invalid BIN."} />
            <GenericInput label={"PCN:"} id={"pcn"} errorState={errorState?.pcn} errorMessage={"Invalid PCN."} />
            <GenericInput label={"Insurance #:"} id={"insurance-number"} errorState={errorState?.insuranceNumber} errorMessage={"Invalid Insurance #."} />
            <GenericInput label={"SSN:"} id={"ssn"} errorState={errorState?.ssn} errorMessage={"Invalid SSN."} />
        </Fieldset>
    )
}