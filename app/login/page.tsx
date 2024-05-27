"use server"
import { login } from './action'
import Link from 'next/link'
import { ErrorBanner } from './error-handler'
import Image from 'next/image'
import { Input } from '@/components/catalyst-ui/input'
import { Field, Label } from '@/components/catalyst-ui/fieldset'
import { Button } from '@/components/catalyst-ui/button'
import { Heading } from '@/components/catalyst-ui/heading'

export default async function LoginPage() {
  return (
      <>
        <ErrorBanner/>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Image
              className="mx-auto h-10 w-auto"
              width={80}
              height={80}
              priority
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            {/* <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"> */}
              <Heading className='text-center text-2xl font-bold'>
              Sign in to your account
              </Heading>
            {/* </h2> */}
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" method="POST">
              <Field>
                <Label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </Label>
                <div className="mt-2">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                  />
                </div>
              </Field>
  
              <Field>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </Label>
                  <div className="text-sm">
                    <Link href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                  />
                </div>
              </Field>
  
              <div>
                <Button
                  type='submit'
                  formAction={login}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </Button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <Link href="/sign-up" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Sign-up here!
              </Link>
            </p>
          </div>
        </div>
      </>
    )
  }

