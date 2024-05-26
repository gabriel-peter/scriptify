"use client"

import { cn } from "@/utils/cn"
import { PaginationFilters } from "@/utils/supabase/types"


export function resetPageIndices(PAGE_SIZE: number): PaginationFilters {
  return { toIndex: 0, fromIndex: PAGE_SIZE }
}

export default function Paginator(
  { resultCount, setQueryFilters, queryFilters, pageSize }:
    {
      resultCount: number,
      queryFilters: { toIndex: number, fromIndex: number },
      setQueryFilters: (x: { toIndex: number, fromIndex: number }) => void,
      pageSize: number
    }

) {
  return (
    <div className="w-full fixed bottom-0 left-0">
    <nav
      className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mr-5"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{queryFilters.toIndex + 1}</span> to <span className="font-medium">{Math.min(queryFilters.fromIndex, resultCount)}</span> of{' '}
          <span className="font-medium">{resultCount}</span> results
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <button
          disabled={queryFilters.toIndex === 0}
          onClick={() => setQueryFilters({
            ...queryFilters,
            toIndex: Math.max(queryFilters.toIndex - pageSize, 0),
            fromIndex: Math.max(queryFilters.fromIndex - pageSize, pageSize),
          })}
          className={cn(
            queryFilters.toIndex === 0 ? "bg-gray-300" : "bg-white hover:bg-gray-50",
            "relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus-visible:outline-offset-0"
          )}
        >
          Previous
        </button>
        <button
          disabled={queryFilters.fromIndex >= resultCount}
          onClick={() => setQueryFilters({
            ...queryFilters,
            toIndex: queryFilters.toIndex + pageSize,
            fromIndex: queryFilters.fromIndex + pageSize,
          })}
          className={cn(
            queryFilters.fromIndex >= resultCount ? "bg-gray-300" : "bg-white hover:bg-gray-50",
            "relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus-visible:outline-offset-0"
          )}
        >
          Next
        </button>
      </div>
    </nav>
    </div>
  )
}
