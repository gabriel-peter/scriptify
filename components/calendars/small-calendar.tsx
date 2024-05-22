"use client"
import { Fragment, useEffect, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { cn } from '@/utils/cn'

const meetings = [
    {
        id: 1,
        name: 'Leslie Alexander',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        start: '1:00 PM',
        startDatetime: '2022-01-21T13:00',
        end: '2:30 PM',
        endDatetime: '2022-01-21T14:30',
    },
    // More meetings...
]

type Day = { date: string, isCurrentMonth: boolean, isSelected: boolean, isToday: boolean };

export default async function SimpleCalendar() {
    const today = new Date()
    const [monthCursor, setMonthCursor] = useState<Date>(today)
    const [days, setDays] = useState<Day[]>(getDayList(monthCursor))

    function getDayList(selectedMonth: Date) {
        const currentMonth = selectedMonth.getMonth()
        const currentYear = selectedMonth.getFullYear()
        const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
        const lastDayOfPreviousMonth = new Date(currentYear, currentMonth, 0).getDate();
        const daysFromPreviousMonth = new Date(currentYear, currentMonth, 1).getDay();
        console.log('lastDayOfPreviousMonth', lastDayOfPreviousMonth, 'daysFromPreviousMonth', daysFromPreviousMonth)
        let days: Day[] = []
        // Add the days from the previous month
        for (let day = lastDayOfPreviousMonth - daysFromPreviousMonth + 2; day <= lastDayOfPreviousMonth; day++) {
            const date = new Date(currentYear, currentMonth - 1, day);
            const formattedDate = date.toISOString().split('T')[0];
            console.log('formattedDate', formattedDate)
            days.push({ date: formattedDate, isCurrentMonth: false, isSelected: false, isToday: today === date });
        }

        for (let day = 1; day <= lastDay; day++) {
            const date = new Date(currentMonth, currentMonth, day);
            const formattedDate = date.toISOString().split('T')[0];
            days.push({ date: formattedDate, isCurrentMonth: true, isSelected: false, isToday: today === date });
        }
        return days;
    }

    useEffect(() => {
        setDays(getDayList(monthCursor))
    }, [monthCursor])

    
    return (
        <div>
            <div className="flex items-center">
                <h2 className="flex-auto text-sm font-semibold text-gray-900">{monthCursor.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                <button
                    type="button"
                    onClick={() => setMonthCursor(new Date(monthCursor.getFullYear(), monthCursor.getMonth() - 1, 1))}
                    className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                    <span className="sr-only">Previous month</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                    type="button"
                    onClick={() => setMonthCursor(new Date(monthCursor.getFullYear(), monthCursor.getMonth() + 1, 1))}
                    className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                    <span className="sr-only">Next month</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
            </div>
            <div className="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>T</div>
                <div>F</div>
                <div>S</div>
                <div>S</div>
            </div>
            <div className="mt-2 grid grid-cols-7 text-sm">
                {days.map((day, dayIdx) => (
                    <div key={day.date} className={cn(dayIdx > 6 && 'border-t border-gray-200', 'py-2')}>
                        <button
                            type="button"
                            className={cn(
                                day.isSelected && 'text-white',
                                !day.isSelected && day.isToday && 'text-indigo-600',
                                !day.isSelected && !day.isToday && day.isCurrentMonth && 'text-gray-900',
                                !day.isSelected && !day.isToday && !day.isCurrentMonth && 'text-gray-400',
                                day.isSelected && day.isToday && 'bg-indigo-600',
                                day.isSelected && !day.isToday && 'bg-gray-900',
                                !day.isSelected && 'hover:bg-gray-200',
                                (day.isSelected || day.isToday) && 'font-semibold',
                                'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                            )}
                        >
                            <time dateTime={day.date}>{day.date.split('-').pop().replace(/^0/, '')}</time>
                        </button>
                    </div>
                ))}
            </div>
            <section className="mt-12">
                <h2 className="text-base font-semibold leading-6 text-gray-900">
                    Schedule for <time dateTime="2022-01-21">January 21, 2022</time>
                </h2>
                <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
                    {meetings.map((meeting) => (
                        <li
                            key={meeting.id}
                            className="group flex items-center space-x-4 rounded-xl px-4 py-2 focus-within:bg-gray-100 hover:bg-gray-100"
                        >
                            <img src={meeting.imageUrl} alt="" className="h-10 w-10 flex-none rounded-full" />
                            <div className="flex-auto">
                                <p className="text-gray-900">{meeting.name}</p>
                                <p className="mt-0.5">
                                    <time dateTime={meeting.startDatetime}>{meeting.start}</time> -{' '}
                                    <time dateTime={meeting.endDatetime}>{meeting.end}</time>
                                </p>
                            </div>
                            <Menu as="div" className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100">
                                <div>
                                    <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
                                        <span className="sr-only">Open options</span>
                                        <EllipsisVerticalIcon className="h-6 w-6" aria-hidden="true" />
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
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="#"
                                                        className={cn(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        Edit
                                                    </a>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="#"
                                                        className={cn(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        Cancel
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </li>
                    ))}
                </ol>
            </section>
        </div>
    )
}
