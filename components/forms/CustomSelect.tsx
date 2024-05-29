import { Field, Label } from "../catalyst-ui/fieldset";
import { Select } from "../catalyst-ui/select";
import InputError from "./abstract-input";


export function CustomSelect<T extends string>({
  id, label, options, errorState, errorMessage, presetValue
}: {
  id: string; label: string; options: T[]; errorState: any | undefined; errorMessage?: string, presetValue?: T
}) {
  return (
    <Field>
      <Label>{label}</Label>
      <InputError error={errorState} errorMessage={errorMessage}>
        <Select value={undefined} name={id}>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </Select>
      </InputError>
    </Field>
  );
}
