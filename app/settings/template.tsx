"use server"

import { cn } from "@/utils/cn"
import { UserCircleIcon, FingerPrintIcon, BellIcon, CubeIcon, CreditCardIcon, UsersIcon, ClipboardDocumentIcon } from "@heroicons/react/20/solid"
import { ReactNode } from "react"
import { getUserOrRedirect } from "../actions/user/get"
import { ACCOUNT_TYPE } from "@/utils/enums"

function getNavigation(accountType: ACCOUNT_TYPE) {
    const sideNavigation = [
        { name: 'General', href: '/settings', icon: UserCircleIcon, current: true },
        { name: 'Security', href: '/settings/security', icon: FingerPrintIcon, current: false },
    ]

    switch (accountType) {
        case ACCOUNT_TYPE.PHARMACIST: {
            sideNavigation.push({ name: 'License', href: '/settings/license', icon: ClipboardDocumentIcon, current: false })
            break
        }
        case ACCOUNT_TYPE.PATIENT: {
            sideNavigation.push({ name: 'Billing', href: '/settings/billing', icon: CreditCardIcon, current: false })
            break
        }
    }
    return sideNavigation
}

export default async function SettingsNavigation({ children }: { children: ReactNode }) {
    const user = await getUserOrRedirect()
    const sideNavigation = getNavigation(user.user_metadata['account_type'])
    return (<div className="mx-auto max-w-7xl lg:flex lg:gap-x-16 lg:px-8">
        <h1 className="sr-only">General Settings</h1>

        <aside className="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20">
            <nav className="flex-none px-4 sm:px-6 lg:px-0">
                <ul role="list" className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
                    {sideNavigation.map((item) => (
                        <li key={item.name}>
                            <a
                                href={item.href}
                                className={cn(
                                    item.current
                                        ? 'bg-gray-50 text-indigo-600'
                                        : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                    'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold'
                                )}
                            >
                                <item.icon
                                    className={cn(
                                        item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                        'h-6 w-6 shrink-0'
                                    )}
                                    aria-hidden="true"
                                />
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
        {children}
    </div>)
}