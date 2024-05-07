export function Dropdown({ id, label, options }: { id: string, label: string, options: string[] }) {
    return (
      <div className="flex flex-col my-7 mx-2.5">
        <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
        <select
          id={id}
          name={id}
          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          {options.map((e) => <option key={e}>{e}</option>)}
        </select>
      </div>
    )
  }