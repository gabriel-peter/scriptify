import { Field, Label } from "../catalyst-ui/fieldset";
import { Select } from "../catalyst-ui/select";
import InputError from "./abstract-input";


export function CustomSelect({
  id, label, options, errorState, errorMessage
}: {
  id: string; label: string; options: any[]; errorState: any | undefined; errorMessage?: string;
}) {
  return (
    <Field>
      <Label>{label}</Label>
      <InputError error={errorState} errorMessage={errorMessage}>
        <Select name={id}>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </Select>
      </InputError>
    </Field>
  );
}
