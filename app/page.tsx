'use server';

import { Button } from "@/components/catalyst-ui/button";
import { Field, Label } from "@/components/catalyst-ui/fieldset";
import { Input } from "@/components/catalyst-ui/input";

export default async function HomePage() {


  return (
      <div>
        <Newsletter/>
      </div>
  );
}

function Newsletter() {
  async function addNewSubscriber(formData: FormData) {
    'use server'
    const email = formData.get('email-address')
    // TODO
  }
  return (
    <div className="bg-white py-16 sm:py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="max-w-xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:col-span-7">
          <h2 className="inline sm:block lg:inline xl:block">Want product news and updates?</h2>{' '}
          <p className="inline sm:block lg:inline xl:block">Sign up for our newsletter.</p>
        </div>
        <form action={addNewSubscriber} className="w-full max-w-md lg:col-span-5 lg:pt-2">
          <Field className="flex gap-x-4">
            <Label htmlFor="email-address" className="sr-only">
              Email address
            </Label>
            <Input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              // className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Enter your email"
            />
            <Button
              type="submit"
              className="flex-none rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Subscribe
            </Button>
          </Field>
          <p className="mt-4 text-sm leading-6 text-gray-900">
            We care about your data. Read our{' '}
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
              privacy&nbsp;policy
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  )
}
