"use server"

import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation";

export default async function Layout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode,
  }) {
    // const supabase = createClient()
    // const {data: {user} } = await supabase.auth.getUser();
    
    return (<>{children}</>)
  };