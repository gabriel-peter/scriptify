import { Field, Fieldset, Label, Legend } from "../catalyst-ui/fieldset";
import { Input } from "../catalyst-ui/input";
import { Select } from "../catalyst-ui/select";
import InputError from "../forms/abstract-input";

export function CreditCardInput({ userId, errorState }: {
  userId: string, errorState?:
    { creditCardNumber?: string[], expiration?: string[], cvv?: string[] }
}) {
  return (
    <>
      <Fieldset>
        <Legend>Card Details</Legend>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-4">
          <Field>
            <Label htmlFor="card-number" className="sr-only">
              Card number
            </Label>
            <InputError error={errorState?.creditCardNumber} errorMessage="Invalid Credit Card Number.">
              <Input
                type="text"
                name="card-number"
                id="card-number"
                placeholder="Card number"
              />
            </InputError>
            </Field>
            <Field>
              <Label htmlFor="card-expiration-date" className="sr-only">
                Expiration date
              </Label>
              <InputError error={errorState?.expiration} errorMessage="Invalid Expiration Date.">
                <Input
                  type="text"
                  name="card-expiration-date"
                  id="card-expiration-date"
                  placeholder="MM / YY"
                />
              </InputError >
            </Field>
            <Field>
              <Label htmlFor="card-cvc" className="sr-only">
                CVC
              </Label>
              <InputError error={errorState?.cvv} errorMessage="Invalid CVV.">
                <Input
                  type="text"
                  name="card-cvc"
                  id="card-cvc"
                  placeholder="CVC"
                />
              </InputError>
            </Field>
            </div>
      </Fieldset>
      <Fieldset>
        <Legend>Billing address</Legend>
        <div className="mt-2 -space-y-px rounded-md shadow-sm">
          <Field>
            <Label htmlFor="country" className="sr-only">
              Country
            </Label>
            <InputError error={undefined} errorMessage="Invalid Country.">
              <Select
                id="country"
                name="country"
                autoComplete="country-name"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </Select>
            </InputError>
          </Field>
          <Field>
            <Label htmlFor="postal-code" className="sr-only">
              ZIP / Postal code
            </Label>
            <InputError error={undefined} errorMessage="Invalid Zip / Postal Code.">
              <Input
                type="text"
                name="postal-code"
                id="postal-code"
                autoComplete="postal-code"
                placeholder="ZIP / Postal code"
              />
            </InputError>
          </Field>
        </div>
      </Fieldset>
      </>
  )
}