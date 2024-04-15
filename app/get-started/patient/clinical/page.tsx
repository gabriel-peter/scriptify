export default function ClinicalPreference() {
  const langaugePreferences = [
    'English',
    'Spanish',
    'Chinese',
    'French',
    'Arabic'
  ]
  const meetingPreference = [
    'Video Call- only',
    'In-person',
    'Hybrid - No preference'
  ]
  const race = [
    "--",
    "American Indian or Alaska Native",
    "Asian",
    "Black or African American",
    "Native Hawaiian or Other Pacific Islander",
    "White",
    "Hispanic or Latino",
    "Mixed Race",
    "Other"
  ]
  const sexualOrientation = [
    "--",
    "Heterosexual",
    "Homosexual",
    "Bisexual",
    "Pansexual",
    "Asexual",
    "Queer",
    "Questioning",
    "Other"
  ]
  return (
    <div className="flex flex-col my-10 mx-2.5">
     <Dropdown label="Language" options={langaugePreferences}/>
     <Dropdown label="Meeting Environment" options={meetingPreference} />
     <Dropdown label="Identified Race" options={race} />
     <Dropdown label="Sexual Orientation" options={sexualOrientation} /> 
    </div>
  );
}

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export function Dropdown({label, options}: {label: string, options: string[]}) {
  return (
    <div className="flex flex-col my-1 mx-2.5">
    <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
      {label}
    </label>
    <select
      id="location"
      name="location"
      className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
      defaultValue="Canada"
    >
      {options.map(e => {
        return (<option key={e}>{e}</option>)
      }
      )}
    </select>
  </div>
  )
}
