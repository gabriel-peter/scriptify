import { Button } from "@/components/catalyst-ui/button";
import { Heading } from "@/components/catalyst-ui/heading";
import { Text } from "@/components/catalyst-ui/text";
import Link from "next/link";

export default function NotFoundPage() {
    return (
      <>
        {/*
          This example requires updating your template:
  
          ```
          <html class="h-full">
          <body class="h-full">
          ```
        */}
        <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-indigo-600">404</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Page not found
              </h1>
            {/* <p className="mt-6 text-base leading-7 text-gray-600"> */}
            <Text>
              Sorry, we couldn’t find the page you’re looking for.
              </Text>
              {/* </p> */}
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                href="/"
              >
                Go back home
              </Button>
              <Button href="/contact-support" className="text-sm font-semibold text-gray-900">
                Contact support <span aria-hidden="true">&rarr;</span>
              </Button>
            </div>
          </div>
        </main>
      </>
    )
  }
  