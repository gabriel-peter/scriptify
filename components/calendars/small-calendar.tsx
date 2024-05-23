"use client"
import { ReactNode, useEffect, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

import { cn } from '@/utils/cn'
import PaddedContainer from '../containers/padded-container'

export function formatDateWithTimezoneOffset(date: Date) {
    const offset = date.getTimezoneOffset()
    console.log(offset)
    date = new Date(date.getTime() - (offset*60*1000))
    return date.toISOString().split('T')[0]
}

type Day = { date: string, isCurrentMonth: boolean, isSelected: boolean, isToday: boolean };

export default function SimpleCalendar({selectedDate, setSelectedDate}: {selectedDate: string, setSelectedDate: (x: string) => void}) {
    const today = new Date()
    console.log("Todays Date", today)
    console.log("Client Timezone", Intl.DateTimeFormat().resolvedOptions().timeZone)
    const [monthCursor, setMonthCursor] = useState<Date>(today)
    const [days, setDays] = useState<Day[]>(getDayList(monthCursor))

    function getDayList(selectedMonth: Date) {
        const currentMonth = selectedMonth.getMonth()
        const currentYear = selectedMonth.getFullYear()
        const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
        const lastDayOfPreviousMonth = new Date(currentYear, currentMonth, 0).getDate();
        const daysFromPreviousMonth = new Date(currentYear, currentMonth, 1).getDay();
        console.debug('lastDayOfPreviousMonth', lastDayOfPreviousMonth, 'daysFromPreviousMonth', daysFromPreviousMonth)
        let days: Day[] = []
        // Add the days from the previous month
        for (let day = lastDayOfPreviousMonth - daysFromPreviousMonth + 1; day <= lastDayOfPreviousMonth; day++) {
            const date = new Date(currentYear, currentMonth - 1, day);
            const formattedDate = formatDateWithTimezoneOffset(date);
            console.debug('formattedDate', formattedDate)
            days.push({ date: formattedDate, isCurrentMonth: false, isSelected: false, isToday: today === date });
        }

        for (let day = 1; day <= lastDay; day++) {
            const date = new Date(currentYear, currentMonth, day);
            const formattedDate = formatDateWithTimezoneOffset(date);
            days.push({ date: formattedDate, isCurrentMonth: true, isSelected: false, isToday: today === date });
        }
        return days;
    }

    useEffect(() => {
        const newDays = getDayList(monthCursor)
        setDays(newDays)
    }, [monthCursor])

    useEffect(() => {
        console.log("selected date", selectedDate)
        const newDays = days.map(day => ({...day, isSelected: day.date === selectedDate}))
        setDays(newDays)
    }, [selectedDate])
    
    return (
        <PaddedContainer>
            <div className="flex items-center">
                <h2 className="flex-auto text-sm font-semibold text-gray-900">{monthCursor.toLocaleString('en-US', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, month: 'long', year: 'numeric' })}</h2>
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
                <div>S</div>
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>T</div>
                <div>F</div>
                <div>S</div>    
            </div>
            <div className="mt-2 grid grid-cols-7 text-sm">
                {days.map((day, dayIdx) => (
                    <div key={day.date} className={cn(dayIdx > 6 && 'border-t border-gray-200', 'py-2')}>
                        <button
                            type="button"
                            onClick={() => setSelectedDate(day.date)}
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
            </PaddedContainer>
    )
}
