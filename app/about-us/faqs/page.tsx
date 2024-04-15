"use client"
import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

const faqs = [
    {
      question: "How can I refill my prescription?",
      answer:
        "You can refill your prescription by visiting our pharmacy in person and providing your prescription bottle, or you can call us and request a refill. Some prescriptions may also be refillable online through our website or mobile app.",
    },
    {
      question: "What should I do if I miss a dose of my medication?",
      answer:
        "If you miss a dose of your medication, take it as soon as you remember unless it is almost time for your next dose. In that case, skip the missed dose and continue with your regular dosing schedule. Do not double dose to make up for a missed one. If you have any concerns, consult your pharmacist or healthcare provider.",
    },
    {
      question: "Can I transfer my prescription from another pharmacy?",
      answer:
        "Yes, you can transfer your prescription from another pharmacy to our pharmacy. Simply provide us with the details of your prescription, including the medication name, strength, and prescription number, as well as the name and contact information of your previous pharmacy. Our pharmacists will take care of the rest.",
    },
    {
      question: "What should I do if I experience side effects from my medication?",
      answer:
        "If you experience side effects from your medication, it is important to speak with your pharmacist or healthcare provider as soon as possible. They can assess the severity of the side effects and determine the best course of action. In some cases, adjusting the dosage or switching to a different medication may be necessary.",
    },
    {
      question: "How can I dispose of expired or unused medications?",
      answer:
        "It is important to properly dispose of expired or unused medications to prevent accidental ingestion or environmental contamination. Many pharmacies offer medication disposal programs where you can bring your unused medications for safe disposal. You can also check with your local government or health department for medication take-back events in your area. Do not flush medications down the toilet or throw them in the trash unless specifically instructed to do so.",
    },
    // Add more FAQs as needed
  ];

export default function Example() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-base font-semibold leading-7">{faq.question}</span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                          ) : (
                            <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
