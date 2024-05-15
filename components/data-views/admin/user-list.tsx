"use client"
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { cn } from "@/utils/cn";
import { Database } from '../../../types_db';
import { PostgrestError } from '@supabase/supabase-js';
import { toHumanReadableDate } from '@/utils/time';
import ProfilePhoto from '../profile-photo';
import { stringifyName } from '@/utils/user-attribute-modifiers';
import Link from 'next/link';

export default function AdminUserList({ users }: {
  users:
  { error: PostgrestError | null, data: Database['public']['Views']['user_profiles']['Row'][] | null }
}) {
  if (!users.data) {
    return (<div>NO DATA :(</div>)
  }

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {users.data.map((person, indx) => (
        <li key={person.email} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <ProfilePhoto size={35} userId={person.id} />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                <Link href={`/admin/patient/${person.id}`} className="hover:underline">
                  {stringifyName({ first_name: person.first_name!, last_name: person.last_name! })}
                </Link>
              </p>
              <p className="mt-1 flex text-xs leading-5 text-gray-500">
                <a href={`mailto:${person.email}`} className="truncate hover:underline">
                  {person.email}
                </a>
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-x-6">
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{'TODO'}</p>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Member since <time dateTime={person.created_at}>{toHumanReadableDate({
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }, person.created_at)}</time>
              </p>
            </div>
            <Menu as="div" className="relative flex-none">
              <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                <span className="sr-only">Open options</span>
                <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={cn(
                          active ? 'bg-gray-50' : '',
                          'block px-3 py-1 text-sm leading-6 text-gray-900'
                        )}
                      >
                        View profile<span className="sr-only">, {person.first_name}</span>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={cn(
                          active ? 'bg-gray-50' : '',
                          'block px-3 py-1 text-sm leading-6 text-gray-900'
                        )}
                      >
                        Message<span className="sr-only">, {person.first_name}</span>
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </li>
      ))}
    </ul>
  )
}