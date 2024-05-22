import { ReactNode } from "react";

// Tthis cant be a template because it reloads at every stage... layout with revalidate path || caching user state across the application
export default function RootTemplate({ children }: { children: ReactNode }) {
    return (
        <>
            {children}
        </>

    )
}