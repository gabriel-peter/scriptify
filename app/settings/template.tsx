"use server"

import SettingsNavigation from "./settings-nave"


export default async function SettingsTemplate({children}:{children}) {
    return (
        <>
        <SettingsNavigation/>
        {children}
        </>
    )
}