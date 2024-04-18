import GenericInput from "../form/generic-input";

export default function MedicalInsuranceInput() {
    return (
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2 sm:col-start-1">
            <GenericInput label={"Insurance Name:"} id={"insurance-name"} errorState={undefined} errorMessage={""} />
            </div>
            <div className="sm:col-span-2">
            <GenericInput label={"Insurance ID #:"} id={"insurance-id"} errorState={undefined} errorMessage={""} />
            </div>
            <div className="sm:col-span-2">
            <GenericInput label={"RX Group #:"} id={"rx-group"} errorState={undefined} errorMessage={""} />
            </div>
            <GenericInput label={"BIN:"} id={"bin"} errorState={undefined} errorMessage={""} />
            <GenericInput label={"PCN:"} id={"pcn"} errorState={undefined} errorMessage={""} />
            <GenericInput label={"Insurance #:"} id={"insurance"} errorState={undefined} errorMessage={""} />
            <GenericInput label={"SSN:"} id={"social"} errorState={undefined} errorMessage={""} />
        </div>
    )
}