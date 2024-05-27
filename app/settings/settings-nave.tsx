"use client"
import { UserCircleIcon, FingerPrintIcon, BellIcon, CubeIcon, CreditCardIcon, UsersIcon, ClipboardDocumentIcon } from "@heroicons/react/20/solid"
import { ReactElement, ReactNode, useEffect, useState } from "react"
import { getUserOrRedirect } from "../actions/user/get"
import { ACCOUNT_TYPE } from "@/utils/enums"
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from "@/components/catalyst-ui/navbar"
import { usePathname } from "next/navigation"
import { User } from "@supabase/supabase-js"
import { Route } from "next"

function getNavigation(accountType: ACCOUNT_TYPE) {
    const sideNavigation = [
        { name: 'Profile', href: '/settings', icon: <UserCircleIcon />, current: false },
        { name: 'Security', href: '/settings/security', icon: <FingerPrintIcon />, current: false },
    ]

    switch (accountType) {
        case ACCOUNT_TYPE.PHARMACIST: {
            sideNavigation.push({ name: 'License', href: '/settings/license', icon: <ClipboardDocumentIcon />, current: false })
            break
        }
        case ACCOUNT_TYPE.PATIENT: {
            sideNavigation.push({ name: 'Billing', href: '/settings/billing', icon: <CreditCardIcon />, current: false })
            break
        }
    }
    return sideNavigation
}

export default async function SettingsNavigation() {
    const pathname = usePathname()
    const [sideNavigation, setSideNavigation] = useState<{name: string, href: Route<string>, icon: JSX.Element, current: boolean}[]>([]);
    useEffect(() => {
        getUserOrRedirect().then((user) => setSideNavigation(getNavigation(user.user_metadata['account_type'])
        .map(e => ({ ...e, current: e.href === pathname })) ))
    }, [])
    
    return (
        <>
            <Navbar>
                <NavbarSection className="max-lg:hidden">
                    {sideNavigation.map(({ name, href, icon, current }) => (
                        <>
                            <NavbarItem current={current} key={name} href={href}>
                                {icon}
                                {name}
                            </NavbarItem>
                            <NavbarSpacer />
                        </>
                    ))}
                </NavbarSection>
            </Navbar>
        </>
    );
}