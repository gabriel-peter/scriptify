"use client"
import { langaugePreferences, meetingPreference, race, sexualOrientation, chronicConditions } from "@/app/api/patient-get-started/options"
import AbstractForm from "@/components/forms/abstract-form-full-page";
import CheckboxGroup from "@/components/forms/checkbox-group";
import { useFormState } from "react-dom";
import { NativeDropdown } from "@/components/forms/dropdown";
import { Status } from "@/components/forms/validation-helpers";
import { useRouter } from "next/navigation";
import savePatientClinicalPreferences from "./clinical-preferences-form";

export default function ClinicalPreference() {
  const savePatientClinicalPreferencesWithUserId = savePatientClinicalPreferences.bind(null, "user-id");
  const [state, formAction] = useFormState(savePatientClinicalPreferencesWithUserId, { status: Status.NOT_SUBMITTED })
  const router = useRouter();
  return (
    <div className="flex flex-col my-10 mx-2.5">
      <AbstractForm formAction={formAction} state={state} successAction={() => router.push("/patient/get-started/payment")} header="Clinical Preferences">
        <NativeDropdown id="language" label="Language" options={Object.values(langaugePreferences)} />
        <NativeDropdown id="meeting-environment" label="Meeting Environment" options={meetingPreference} />
        <NativeDropdown id="race" label="Identified Race" options={race} />
        <NativeDropdown id="sexual-orientation" label="Sexual Orientation" options={sexualOrientation} />
        <CheckboxGroup label="Select if you have any of the chronic Condiitions" options={chronicConditions} />
      </AbstractForm>
    </div>
  );
}
