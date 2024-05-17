import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function SearchBar({ text, setText}: {text?: string, setText: (x: string) => void}) {
    
    return (
        <>
        <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />
        <div className="flex flex-1 gap-x-4 self-stretch ">
            <div className="relative flex flex-1 h-10">
                <label htmlFor="search-field" className="sr-only">
                    Search
                </label>
                <MagnifyingGlassIcon
                    className="pointer-events-none absolute ml-3 inset-y-0 h-full w-5 text-gray-400"
                    aria-hidden="true"
                />
                <input
                    id="search-field"
                    className="block h-full w-full border-0 py-0 ml-2 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                    placeholder="Search..."
                    type="search"
                    onChange={e => setText(e.target.value)}
                    name="search"
                    value={text}
                />
            </div>
        </div>
        </>
    )
}