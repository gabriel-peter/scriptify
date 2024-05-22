import { ReactNode } from "react";


export default async function PaddedContainer({ children }: { children: ReactNode }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            {children}
        </div>
    )
}