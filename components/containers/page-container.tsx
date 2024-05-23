import { ReactNode } from "react";

export default function PageContainer({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen">
            <div className="container mx-auto mt-8 px-4">
                {children}
            </div>
        </div>
    )
}