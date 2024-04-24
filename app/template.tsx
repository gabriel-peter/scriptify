import { ReactNode } from "react";
import DashboardNavigationBar from "./components/nav/main-nav";

export default function RootTemplate({ children }: { children: ReactNode }) {
    return (
        <>
            <DashboardNavigationBar />
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                {children}
            </div>
        </>

    )
}