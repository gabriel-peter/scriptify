"use client"

export default function Paginator(
  { resultCount, setQueryFilters, queryFilters, pageSize }:
    {
      resultCount: number,
      queryFilters: {toIndex: number, fromIndex: number},
      setQueryFilters: (x: {toIndex: number, fromIndex: number}) => void,
      pageSize: number
    }

) {
  return (
    <nav
      className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{queryFilters.toIndex + 1}</span> to <span className="font-medium">{Math.min(queryFilters.fromIndex + 1, resultCount + 1)}</span> of{' '}
          <span className="font-medium">{resultCount+ 1}</span> results
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
          className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
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
          className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
        >
          Next
        </button>
      </div>
    </nav>
  )
}
