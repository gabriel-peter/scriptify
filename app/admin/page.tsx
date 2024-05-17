"use client"

import AdminUserList from "@/components/data-views/admin/user-list";
import { getUsersPaginated, GetUsersPaginatedFilter, UserProfileResponse } from "./actions";
import { useEffect, useState } from "react";
import Paginator from "@/components/tables/pagination-footer";

export default function AdminHomePage() {
    const PAGE_SIZE = 15;
    const [users, setUsers] = useState<UserProfileResponse>();
    const [queryFilters, setQueryFilters] = useState<GetUsersPaginatedFilter>({
        toIndex: 0,
        fromIndex: PAGE_SIZE
    });
    const [count, setCount] = useState<number|null>(null);
    useEffect(() => {
        getUsersPaginated(queryFilters).then((result) => {setUsers(result); setCount(result.count)})
    }, [queryFilters, setQueryFilters, count, setCount])
    return (
        <>
        <div>HomepAge</div>
        <AdminUserList users={users}/>
        <Paginator 
        resultCount={count || 0} 
        queryFilters={queryFilters} 
        setQueryFilters={setQueryFilters}
        pageSize={PAGE_SIZE}/>
        </>
    )
}

