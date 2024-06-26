"use client"
import { langaugePreferences, meetingPreference, race, sexualOrientation, chronicConditions } from "@/app/actions/options"
import AbstractForm from "@/components/forms/abstract-form-full-page";
import CustomCheckboxGroup from "@/components/forms/checkbox-group";
import { useFormState } from "react-dom";
import { NativeDropdown } from "@/components/forms/dropdown";
import { CustomSelect } from '../CustomSelect';
import { Status } from "@/app/actions/validation-helpers";
import { useRouter } from "next/navigation";
import savePatientClinicalPreferences from "./clinical-preferences-form";

export default function ClinicalPreference({userId}: {userId: string}) {
  const savePatientClinicalPreferencesWithUserId = savePatientClinicalPreferences.bind(null, userId);
  const [state, formAction] = useFormState(savePatientClinicalPreferencesWithUserId, { status: Status.NOT_SUBMITTED })
  const router = useRouter();
  return (
    <div className="flex flex-col my-10 mx-2.5">
      <AbstractForm formAction={formAction} state={state} successAction={() => router.push("/patient/get-started/insurance")} header="Clinical Preferences">
        <CustomSelect id="language" label="Language" options={Object.values(langaugePreferences)} />
        <CustomSelect id="meeting-environment" label="Meeting Environment" options={Object.values(meetingPreference).map(e => e.toString())} />
        <CustomSelect id="race" label="Identified Race" options={Object.values(race).map(e => e.toString())} />
        <CustomSelect id="sexual-orientation" label="Sexual Orientation" options={sexualOrientation} />
        <CustomCheckboxGroup label="Select if you have any of the chronic Condiitions" options={
          Object.keys(chronicConditions).map(key => ({
            key,
            value: chronicConditions[key as keyof typeof chronicConditions]
        }))} />
      </AbstractForm>
    </div>
  );
}
