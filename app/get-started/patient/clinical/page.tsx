"use client"
import savePatientClinicalPreferences from "@/app/get-started/patient/clinical/clinical-preferences-form";
import { langaugePreferences, meetingPreference, race, sexualOrientation, chronicConditions } from "@/app/api/patient-get-started/options"
import AbstractForm from "@/app/components/forms/abstract-form";
import CheckboxGroup from "@/app/components/forms/checkbox-group";
import { useFormState } from "react-dom";
import { Dropdown } from "@/app/components/forms/dropdown";
import { Status } from "@/app/components/forms/validation-helpers";

export default function ClinicalPreference() {
  const savePatientClinicalPreferencesWithUserId = savePatientClinicalPreferences.bind(null, "user-id");
  const [state, formAction] = useFormState(savePatientClinicalPreferencesWithUserId, { status: Status.NOT_SUBMITTED })
  return (
    <div className="flex flex-col my-10 mx-2.5">
      <AbstractForm formAction={formAction} state={state} redirectUrl="/get-started/patient/payment" header="Clinical Preferences">
        <Dropdown id="language" label="Language" options={langaugePreferences} />
        <Dropdown id="meeting-environment" label="Meeting Environment" options={meetingPreference} />
        <Dropdown id="race" label="Identified Race" options={race} />
        <Dropdown id="sexual-orientation" label="Sexual Orientation" options={sexualOrientation} />
        <CheckboxGroup label="Select if you have any of the chronic Condiitions" options={chronicConditions} />
      </AbstractForm>
    </div>
  );
}
