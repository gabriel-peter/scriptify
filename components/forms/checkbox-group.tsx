import { Checkbox, CheckboxField, CheckboxGroup } from "../catalyst-ui/checkbox";
import { Description, Fieldset, Label, Legend } from "../catalyst-ui/fieldset";

export default function CustomCheckboxGroup({ label, options }: { label: string, options: Record<string, string>[] }) {
    return (
        <Fieldset>
            <Legend className="text-base font-semibold leading-6 text-gray-900">{label}</Legend>
            <CheckboxGroup>
                {options.map((object, idx) => (
                    <CheckboxField>
                    <Checkbox name={`condition-${object.key}`} value={`condition-${object.key}`} />
                    <Label htmlFor={`condition-${object.key}`}>{object.value}</Label>
                    {/* <Description>Make this event visible on your profile.</Description> */}
                  </CheckboxField>
                    // <div key={idx} className="relative flex items-start py-4">
                    //     <div className="min-w-0 flex-1 text-sm leading-6">
                    //         <label htmlFor={`condition-${object.key}`} className="select-none font-medium text-gray-900">
                    //             {object.value}
                    //         </label>
                    //     </div>
                    //     <div className="ml-3 flex h-6 items-center">
                    //         <input
                    //             id={`condition-${object.key}`}
                    //             name={`condition-${object.key}`}
                    //             type="checkbox"
                    //             className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    //         />
                    //     </div>
                    // </div>
                ))}
            </CheckboxGroup>
        </Fieldset>
    )
}
