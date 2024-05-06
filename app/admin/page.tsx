"use server"

import { getUsersPaginated } from "./actions";

export default async function AdminHomePage() {
    const users = await getUsersPaginated();
    return (
        <div>HomepAge</div>
    )
}