import { Route } from "next";
import Link from "next/link";
import { Heading } from "../catalyst-ui/heading";
import { Button } from "../catalyst-ui/button";

// export async function SectionHeadingWithAction({ title, actionHref, actionTitle }: { title: string, actionHref: Route<string>, actionTitle: string }) {
//     return (
//       <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
//         <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
//           {/* <div className="ml-4 mt-2"> */}
//           <h3 className="text-md mb-4">{title}</h3>
//           {/* </div> */}
//           <div className="flex-shrink-0">
//             <Link
//               href={actionHref}
//               className="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
//               {actionTitle}
//             </Link>
//           </div>
//         </div>
//       </div>
//     )
//   }


export async function SectionHeadingWithAction({ title, actionHref, actionTitle }: { title: string, actionHref: Route<string>, actionTitle: string }) {
    return (
      <div className="flex w-full flex-wrap items-end justify-between gap-4 border-b border-zinc-950/10 pb-6 dark:border-white/10">
        <Heading>{title}</Heading>
        <div className="flex gap-4">
          {/* <Button outline>Refund</Button> */}
          <Button href={actionHref}>{actionTitle}</Button>
        </div>
      </div>
    )
  }