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
                ))}
            </CheckboxGroup>
        </Fieldset>
    )
}
