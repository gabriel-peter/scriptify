"use client"
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { cn } from "@/utils/cn";
import { Route } from "next";
import Link from "next/link";

export type ActionMenuProp = { name: string } & ({ href?: Route<string>, methodCall?: never } | { href?: never, methodCall?: () => void })

// export default function ListActionMenu({ actions }: { actions: ActionMenuProp[] }) {
//     return (
//         <>
//             <Menu as="div" className="relative flex-none">
//                 <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
//                     <span className="sr-only">Open options</span>
//                     <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
//                 </MenuButton>
//                 <Transition
//                     as={Fragment}
//                     enter="transition ease-out duration-100"
//                     enterFrom="transform opacity-0 scale-95"
//                     enterTo="transform opacity-100 scale-100"
//                     leave="transition ease-in duration-75"
//                     leaveFrom="transform opacity-100 scale-100"
//                     leaveTo="transform opacity-0 scale-95"
//                 >
//                     <MenuItems className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
//                         {actions.map((action) => (
//                             <MenuItem
//                                 key={action.href}
//                             >
//                                 {({ active }) => (
//                                     <Link
//                                         href={action.href}
//                                         className={cn(
//                                             active ? 'bg-gray-50' : '',
//                                             'block px-3 py-1 text-sm leading-6 text-gray-900'
//                                         )}
//                                     >
//                                         {action.name}<span className="sr-only">, { }</span>
//                                     </Link>
//                                     /* )
//                                 }
//                                 if (action.methodCall) {
//                                     return ( // TODO this can be an href to a route. might be hard to pass functions to this
//                                         <button
//                                             onClick={() => }
//                                             className={cn(
//                                                 active ? 'bg-gray-50' : '',
//                                                 'block px-3 py-1 text-sm leading-6 text-gray-900'
//                                             )}
//                                         >
//                                             {action.name}<span className="sr-only">, { }</span>
//                                         </button>
//                                     )
//                                 }
//                             }} */
//                                 )}
//                             </MenuItem>
//                         ))}
//                     </MenuItems>
//                 </Transition>
//             </Menu>
//         </>
//     );
// }

import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@/components/catalyst-ui/dropdown'
import { EllipsisHorizontalIcon } from '@heroicons/react/16/solid'

export default function ListActionMenu({ actions }: { actions: ActionMenuProp[] }) {
    return (
    <Dropdown>
      <DropdownButton plain aria-label="More options">
        <EllipsisHorizontalIcon />
      </DropdownButton>
      <DropdownMenu>
        {actions.map(e => {
            if (e.href) {
                return <DropdownItem key={e.name} href={e.href}>{e.name}</DropdownItem>
            } else if (e.methodCall) {
                return <DropdownItem key={e.name} onClick={() => e.methodCall()}>{e.name}</DropdownItem>
            }
        })}
      </DropdownMenu>
    </Dropdown>
  )
}