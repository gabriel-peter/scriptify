import { ReactNode } from "react";


export default function PaddedContainer({ children }: { children: ReactNode }) {
    return (
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md p-6 mb-8">
            {children}
        </div>
    )
}