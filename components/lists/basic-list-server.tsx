"use server"
import { ReactNode } from "react";
import ListActionMenu, { ActionMenuProp } from "./basic-list-action-menu";

export async function BasicList_Server<T>({ items, row, actionBuilder: actionBuilder }: { items: T[], row: (x: T) => ReactNode, actionBuilder?: (x: T) => ActionMenuProp[] }) {
    return (
        <ul role="list" 
        className="divide-y divide-gray-100 dark:divide-zinc-950/10"
        // className="border-b border-zinc-950/10 pb-6 dark:border-white/10"
        >
            {items?.map((item, indx) => (
                <li key={indx} className="flex items-center justify-between gap-x-6 py-5">
                    {/* <div className="min-w-0"> */}
                        {row(item)}
                    {/* </div> */}
                    <div className="flex flex-none items-center gap-x-4">
                        {actionBuilder && <ListActionMenu actions={actionBuilder(item)} />}
                    </div>
                </li>
            ))}
        </ul>
    )
}