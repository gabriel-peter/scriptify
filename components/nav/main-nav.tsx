'use client';
import { Fragment, useCallback, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import { type User } from '@supabase/supabase-js'
import Image from 'next/image'
import { cn } from '@/utils/cn';
import { Tables } from '@/types_db';
import ProfilePhoto from '../data-views/profile-photo';
import Link from 'next/link';
import { Route } from 'next';
import { ACCOUNT_TYPE } from '@/utils/enums';
import { usePathname } from 'next/navigation';

type NavLink = { name: string, href: Route<string> };
const PUBLIC_NAV_LINKS: NavLink[] = [{ name: 'About Us', href: '/about-us' }]
const ADMIN_NAV_LINKS: NavLink[] = [
    {
        name: 'Users',
        href: '/admin',
    }, {
        name: "Prescription Transfers",
        href: "/admin/prescription-requests"
    }
];
const PATIENT_NAV_LINKS: NavLink[] = [{
    name: 'Dashboard',
    href: `/patient/my-dashboard`,
}]
const PHARMACIST_NAV_LINKS: NavLink[] = [{
    name: 'Dashboard',
    href: `/pharmacist/my-dashboard`,
}]

function getNavBarLinks(user: User | undefined): NavLink[] {
    if (!user) { return PUBLIC_NAV_LINKS };
    switch (user.user_metadata['account_type'] as ACCOUNT_TYPE) {
        case ACCOUNT_TYPE.ADMIN: return ADMIN_NAV_LINKS;
        case ACCOUNT_TYPE.PATIENT: return PATIENT_NAV_LINKS;
        case ACCOUNT_TYPE.PHARMACIST: return PHARMACIST_NAV_LINKS;
    }
}

function getProfileButtonLinks(user: User | undefined): NavLink[] {
    if (user) {
        return [
            {
                name: "Settings",
                href: "/settings"
            },
            {
                name: "Sign-out",
                href: "/auth/signout"
            }
        ]
    } else {
        return [{ name: 'Sign-in', href: "/login" }]
    }
}

function backgroundColorByAccountType(user: User | undefined): string {
    switch (user?.user_metadata['account_type'] as ACCOUNT_TYPE) {
        case ACCOUNT_TYPE.ADMIN: return "bg-red-600"
        case ACCOUNT_TYPE.PHARMACIST: return "bg-blue-900"
        case ACCOUNT_TYPE.PATIENT:
        default:
            return "bg-gray-800"
    }
}


export default function DashboardNavigationBar({ loggedInUser }: { loggedInUser: { user: User, profile: Tables<"profiles"> | null } | null }) {
    const pathname = usePathname()
    const navigation: (NavLink & { current: boolean })[] = getNavBarLinks(loggedInUser?.user)
        .map(e => ({ name: e.name, href: e.href, current: pathname === e.href } as const));
    const userMenuOptions: NavLink[] = getProfileButtonLinks(loggedInUser?.user)


    return (
        <div>
            <div className="min-h-full">
                <Disclosure as="nav" className={backgroundColorByAccountType(loggedInUser?.user)}>
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="flex h-16 items-center justify-between">
                                    <div className="flex items-center">
                                        <Link className="flex-shrink-0" href='/'>
                                            <Image
                                                className="h-8 w-8"
                                                width={8}
                                                height={8}
                                                priority
                                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                                alt="Your Company"
                                            />
                                        </Link>
                                        <div className="hidden md:block">
                                            <div className="ml-10 flex items-baseline space-x-4">
                                                {navigation.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        href={item.href}
                                                        className={cn(
                                                            item.current
                                                                ? 'bg-gray-900 text-white'
                                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                            'rounded-md px-3 py-2 text-sm font-medium'
                                                        )}
                                                        aria-current={item.current ? 'page' : undefined}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    {/* HERER */}
                                    <div className="hidden md:block">
                                        <div className="ml-4 flex items-center md:ml-6">
                                            <button
                                                type="button"
                                                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                            >
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">View notifications</span>
                                                <BellIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>

                                            {/* Profile dropdown */}
                                            <Menu as="div" className="relative ml-3">
                                                <div>
                                                    <Menu.Button
                                                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"

                                                    // className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                                    >
                                                        <span className="absolute -inset-1.5" />
                                                        <span className="sr-only">Open user menu</span>
                                                        <Cog6ToothIcon className="h-6 w-6" aria-hidden="true" />
                                                        {/* <ProfilePhoto size={35} />  // TODO THIS CAUSES A REACT HYDRATION ERROR */}
                                                    </Menu.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        {userMenuOptions.map((item) => (
                                                            <Menu.Item key={item.name}>
                                                                {({ active }) => (
                                                                    <Link
                                                                        href={item.href}
                                                                        className={cn(
                                                                            active ? 'bg-gray-100' : '',
                                                                            'block px-4 py-2 text-sm text-gray-700'
                                                                        )}
                                                                    >
                                                                        {item.name}
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                        ))}
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-0.5" />
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                                {/* Here */}
                            </div>

                            <Disclosure.Panel className="md:hidden">
                                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                    {navigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            as={Link}
                                            href={item.href}
                                            className={cn(
                                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'block rounded-md px-3 py-2 text-base font-medium'
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    ))}
                                </div>
                                <div className="border-t border-gray-700 pb-3 pt-4">
                                    <div className="flex items-center px-5">
                                        <div className="flex-shrink-0">
                                            <ProfilePhoto size={35} />
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-base font-medium text-white">{loggedInUser?.profile?.first_name}</div>
                                            <div className="text-sm font-medium text-gray-400">{loggedInUser?.user.email}</div>
                                        </div>
                                        <button
                                            type="button"
                                            className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                        >
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">View notifications</span>
                                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                    <div className="mt-3 space-y-1 px-2">
                                        {userMenuOptions.map((item) => (
                                            <Disclosure.Button
                                                key={item.name}
                                                as={Link}
                                                href={item.href}
                                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                            >
                                                {item.name}
                                            </Disclosure.Button>
                                        ))}
                                    </div>
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            </div>
        </div>
    )
}
