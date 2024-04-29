import { CreditCardFormValidatedFieldsType } from "@/app/get-started/patient/payment/payment-form-handler";
import AbstractInput from "../forms/abstract-input";

export function CreditCardInput({ userId, errorState }: { userId: string, errorState: CreditCardFormValidatedFieldsType| undefined }) {
  return (
    <div>
      <fieldset>
        <legend className="block text-sm font-medium leading-6 text-gray-900">Card Details</legend>
        <div className="mt-2 -space-y-px rounded-md bg-white shadow-sm">
          <div>
            <label htmlFor="card-number" className="sr-only">
              Card number
            </label>
            <AbstractInput error={errorState?.creditCardNumber} errorMessage="Invalid Credit Card Number.">
              <input
                type="text"
                name="card-number"
                id="card-number"
                className="pl-3 relative block w-full rounded-none rounded-t-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Card number"
              />
            </AbstractInput>
          </div>
          <div className="flex -space-x-px">
            <div className="w-1/2 min-w-0 flex-1">
              <label htmlFor="card-expiration-date" className="sr-only">
                Expiration date
              </label>
              <AbstractInput error={errorState?.expiration} errorMessage="Invalid Expiration Date.">
                <input
                  type="text"
                  name="card-expiration-date"
                  id="card-expiration-date"
                  className="pl-3 relative block w-full rounded-none rounded-bl-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="MM / YY"
                />
              </AbstractInput >
            </div>
            <div className="min-w-0 flex-1">
              <label htmlFor="card-cvc" className="sr-only">
                CVC
              </label>
              <AbstractInput error={errorState?.cvv} errorMessage="Invalid CVV.">
                <input
                  type="text"
                  name="card-cvc"
                  id="card-cvc"
                  className="pl-3 relative block w-full rounded-none rounded-br-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="CVC"
                />
              </AbstractInput>
            </div>
          </div>
        </div>
      </fieldset>
      <fieldset className="mt-6 bg-white">
        <legend className="block text-sm font-medium leading-6 text-gray-900">Billing address</legend>
        <div className="mt-2 -space-y-px rounded-md shadow-sm">
          <div>
            <label htmlFor="country" className="sr-only">
              Country
            </label>
            <AbstractInput error={undefined} errorMessage="Invalid Country.">
              <select
                id="country"
                name="country"
                autoComplete="country-name"
                className="pl-3 relative block w-full rounded-none rounded-t-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
            </AbstractInput>
          </div>
          <div>
            <label htmlFor="postal-code" className="sr-only">
              ZIP / Postal code
            </label>
            <AbstractInput error={undefined} errorMessage="Invalid Zip / Postal Code.">
              <input
                type="text"
                name="postal-code"
                id="postal-code"
                autoComplete="postal-code"
                className="pl-3 relative block w-full rounded-none rounded-b-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="ZIP / Postal code"
              />
            </AbstractInput>
          </div>
        </div>
      </fieldset>
    </div>
  )
}