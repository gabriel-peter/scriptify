import { Route } from "next";
import Link from "next/link";

export async function SectionHeadingWithAction({ title, actionHref, actionTitle }: { title: string, actionHref: Route<string>, actionTitle: string }) {
    return (
      <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
        <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
          {/* <div className="ml-4 mt-2"> */}
          <h3 className="text-md mb-4">{title}</h3>
          {/* </div> */}
          <div className="flex-shrink-0">
            <Link
              href={actionHref}
              className="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              {actionTitle}
            </Link>
          </div>
        </div>
      </div>
    )
  }