"use server"

import AdminUserList from "../components/data-views/admin/user-list";
import { getUsersPaginated } from "./actions";

export default async function AdminHomePage() {
    const users = await getUsersPaginated();
    return (
        <>
        <div>HomepAge</div>
        <AdminUserList users={users}/>
        </>
    )
}

