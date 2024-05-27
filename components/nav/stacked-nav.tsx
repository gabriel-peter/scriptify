"use client"
import { Avatar } from '@/components/catalyst-ui/avatar'
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
  DropdownDivider,
} from '@/components/catalyst-ui/dropdown'
import { StackedLayout } from '@/components/catalyst-ui/stacked-layout'
import {
  Navbar,
  NavbarItem,
  NavbarLabel,
  NavbarSection,
  NavbarDivider,
  NavbarSpacer,
} from '@/components/catalyst-ui/navbar'
import { Sidebar, SidebarLabel, SidebarBody, SidebarHeader, SidebarSection, SidebarItem } from '@/components/catalyst-ui/sidebar'
import * as Headless from '@headlessui/react'
import {
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  Cog8ToothIcon,
  LightBulbIcon,
  PlusIcon,
  ShieldCheckIcon,
  UserIcon,
} from '@heroicons/react/16/solid'
import { InboxIcon, MagnifyingGlassIcon, SunIcon } from '@heroicons/react/20/solid'
import { ReactElement, ReactNode, useEffect, useState } from 'react'
import { Route } from 'next'
import { User } from '@supabase/supabase-js'
import { ACCOUNT_TYPE } from '@/utils/enums'
import { usePathname } from 'next/navigation'
import { Tables } from '@/types_db'
import { cn } from '@/utils/cn'

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
}];
const PHARMACIST_NAV_LINKS: NavLink[] = [
  {
    name: 'Dashboard',
    href: `/pharmacist/my-dashboard`,
  }, {
    name: 'Prescriptions',
    href: '/pharmacist/qv1'
  }
];

function getNavBarLinks(user: User | undefined): NavLink[] {
  if (!user) { return PUBLIC_NAV_LINKS };
  switch (user.user_metadata['account_type'] as ACCOUNT_TYPE) {
    case ACCOUNT_TYPE.ADMIN: return ADMIN_NAV_LINKS;
    case ACCOUNT_TYPE.PATIENT: return PATIENT_NAV_LINKS;
    case ACCOUNT_TYPE.PHARMACIST: return PHARMACIST_NAV_LINKS;
  }
}

function getProfileButtonLinks(user: User | undefined): (NavLink & { icon: ReactElement })[] {
  if (user) {
    return [
      {
        name: "Settings",
        href: "/settings",
        icon: <Cog8ToothIcon />
      },
      {
        name: "Sign-out",
        href: "/auth/signout",
        icon: <ArrowRightStartOnRectangleIcon />
      }
    ]
  } else {
    return [{ name: 'Sign-in', href: "/login", icon: <UserIcon /> }]
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


// function TeamDropdownMenu() {
//   return (
//     <DropdownMenu className="min-w-80 lg:min-w-64" anchor="bottom start">
//       <DropdownItem href="/teams/1/settings">
//         <Cog8ToothIcon />
//         <DropdownLabel>Settings</DropdownLabel>
//       </DropdownItem>
//       <DropdownDivider />
//       <DropdownItem href="/teams/1">
//         <Avatar slot="icon" src="/tailwind-logo.svg" />
//         <DropdownLabel>Tailwind Labs</DropdownLabel>
//       </DropdownItem>
//       <DropdownItem href="/teams/2">
//         <Avatar slot="icon" initials="WC" className="bg-purple-500 text-white " />
//         <DropdownLabel>Workcation</DropdownLabel>
//       </DropdownItem>
//       <DropdownDivider />
//       <DropdownItem href="/teams/create">
//         <PlusIcon />
//         <DropdownLabel>New team&hellip;</DropdownLabel>
//       </DropdownItem>
//     </DropdownMenu>
//   )
// }

type Theme = 'dark' | 'light'

export default function NavLayout({ loggedInUser, children }: { loggedInUser: { user: User, profile: Tables<"profiles"> | null } | null, children: ReactNode }) {
  const [theme, setTheme] = useState<Theme | null>(null);
  // TODO fix flicker bug
  // Effect to apply theme class to <html> element
  useEffect(() => {
    if (theme !== null) {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.style.colorScheme = theme;
    localStorage.setItem('theme', theme); // Save theme preference
    }
  }, [theme]);

  // Toggle theme handler
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  const pathname = usePathname()
  const navigation: (NavLink & { current: boolean })[] = getNavBarLinks(loggedInUser?.user)
    .map(e => ({ name: e.name, href: e.href, current: pathname === e.href } as const));
  const userMenuOptions: (NavLink & { icon: ReactElement })[] = getProfileButtonLinks(loggedInUser?.user)

  return (
      <StackedLayout
        navbar={
          <Navbar>
            {/* <Dropdown> */}
            {/* <DropdownButton as={NavbarItem} className="max-lg:hidden"> */}
            <NavbarItem className="max-lg:hidden">
              <Avatar src="/tailwind-logo.svg" />
              <NavbarLabel>Scriptify Rx</NavbarLabel>
            </NavbarItem>
            {/* <ChevronDownIcon /> */}
            {/* </DropdownButton> */}
            {/* <TeamDropdownMenu />
          </Dropdown> */}
            <NavbarDivider className="max-lg:hidden" />
            <NavbarSection className="max-lg:hidden">
              {navigation.map(({ name, href, current }) => (
                <NavbarItem current={current} key={name} href={href}>
                  {name}
                </NavbarItem>
              ))}
            </NavbarSection>
            <NavbarSpacer />
            <NavbarSection>
              <NavbarItem href="/search" aria-label="Search">
                <MagnifyingGlassIcon />
              </NavbarItem>
              <NavbarItem href="/inbox" aria-label="Inbox">
                <InboxIcon />
              </NavbarItem>
              <NavbarItem onClick={() => toggleTheme()} aria-label="Theme">
                <SunIcon />
              </NavbarItem>
              <Dropdown>
                <DropdownButton as={NavbarItem}>
                  <Avatar initials="tw" square />
                </DropdownButton>
                <DropdownMenu className="min-w-64" anchor="bottom end">
                  {userMenuOptions.map(option =>
                    <DropdownItem key={option.name} href={option.href}>
                      {option.icon}
                      <DropdownLabel>{option.name}</DropdownLabel>
                    </DropdownItem>
                  )}
                  {/* <DropdownItem href="/my-profile">
                  <UserIcon />
                  <DropdownLabel>My profile</DropdownLabel>
                </DropdownItem>
                <DropdownItem href="/settings">
                  <Cog8ToothIcon />
                  <DropdownLabel>Settings</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="/privacy-policy">
                  <ShieldCheckIcon />
                  <DropdownLabel>Privacy policy</DropdownLabel>
                </DropdownItem>
                <DropdownItem href="/share-feedback">
                  <LightBulbIcon />
                  <DropdownLabel>Share feedback</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="/logout">
                  <ArrowRightStartOnRectangleIcon />
                  <DropdownLabel>Sign out</DropdownLabel>
                </DropdownItem> */}
                </DropdownMenu>
              </Dropdown>
            </NavbarSection>
          </Navbar>
        }
        sidebar={
          <Sidebar>
            <SidebarHeader>
              {/* <Dropdown>
              <DropdownButton as={SidebarItem} className="lg:mb-2.5">
                <Avatar src="/tailwind-logo.svg" />
                <SidebarLabel>Tailwind Labs</SidebarLabel>
                <ChevronDownIcon />
              </DropdownButton>
              <TeamDropdownMenu />
            </Dropdown> */}
              <SidebarItem className="lg:mb-2.5">
                <Avatar src="/tailwind-logo.svg" />
                <SidebarLabel>Scriptify Rx</SidebarLabel>
              </SidebarItem>
            </SidebarHeader>
            <SidebarBody>
              <SidebarSection>
                {navigation.map(({ name, href }) => (
                  <SidebarItem key={name} href={href}>
                    {name}
                  </SidebarItem>
                ))}
              </SidebarSection>
            </SidebarBody>
          </Sidebar>
        }
      >
        {children}
      </StackedLayout>
  )
}