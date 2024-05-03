"use client"
import { langaugePreferences, meetingPreference, race, sexualOrientation, chronicConditions } from "@/app/api/patient-get-started/options"
import AbstractForm from "@/app/components/forms/abstract-form";
import CheckboxGroup from "@/app/components/forms/checkbox-group";
import { useFormState } from "react-dom";
import { Dropdown } from "@/app/components/forms/dropdown";
import { Status } from "@/app/components/forms/validation-helpers";
import { useRouter } from "next/router";
import savePatientClinicalPreferences from "./clinical-preferences-form";

export default function ClinicalPreference() {
  const savePatientClinicalPreferencesWithUserId = savePatientClinicalPreferences.bind(null, "user-id");
  const [state, formAction] = useFormState(savePatientClinicalPreferencesWithUserId, { status: Status.NOT_SUBMITTED })
  const router = useRouter();
  return (
    <div className="flex flex-col my-10 mx-2.5">
      <AbstractForm formAction={formAction} state={state} successAction={() => router.push("/get-started/patient/payment")} header="Clinical Preferences">
        <Dropdown id="language" label="Language" options={langaugePreferences} />
        <Dropdown id="meeting-environment" label="Meeting Environment" options={meetingPreference} />
        <Dropdown id="race" label="Identified Race" options={race} />
        <Dropdown id="sexual-orientation" label="Sexual Orientation" options={sexualOrientation} />
        <CheckboxGroup label="Select if you have any of the chronic Condiitions" options={chronicConditions} />
      </AbstractForm>
    </div>
  );
}
