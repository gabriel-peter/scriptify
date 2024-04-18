"use client"
import savePatientClinicalPreferences from "@/app/api/patient-get-started/clinical-preferences-form";
import { langaugePreferences, meetingPreference, race, sexualOrientation, chronicConditions } from "@/app/api/patient-get-started/options"
import CheckboxGroup from "@/app/components/form/checkbox-group";
import { SubmitButton } from "@/app/components/form/submit-button";
import { useFormState } from "react-dom";

const initialState = {
  message: '',
}

export default function ClinicalPreference() {
  const savePatientClinicalPreferencesWithUserId = savePatientClinicalPreferences.bind(null, "user-id");
  const [state, formAction] = useFormState(savePatientClinicalPreferencesWithUserId, initialState)
  return (
    <div className="flex flex-col my-10 mx-2.5">
      <form action={formAction}>
        <Dropdown id="language" label="Language" options={langaugePreferences} />
        <Dropdown id="meeting-environment" label="Meeting Environment" options={meetingPreference} />
        <Dropdown id="race" label="Identified Race" options={race} />
        <Dropdown id="sexual-orientation" label="Sexual Orientation" options={sexualOrientation} />
        <CheckboxGroup label="Select if you have any of the chronic Condiitions" options={chronicConditions} />
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <SubmitButton redirectUrl={state.message && "/get-started/patient/payment"} />
        </div>
      </form>
    </div>
  );
}

export function Dropdown({ id, label, options }: { id: string, label: string, options: string[] }) {
  return (
    <div className="flex flex-col my-7 mx-2.5">
      <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <select
        id={id}
        name={id}
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
      defaultValue="Canada"
      >
        {options.map((e) => <option key={e}>{e}</option>)}
      </select>
    </div>
  )
}
