'use client';

import { createClient } from "@/utils/supabase/server";
import { TestOTP } from "./api/email";

// import { useUser } from '@auth0/nextjs-auth0/client';




export default async function ProfileClient() {


  return (
      <div>
        <button onClick={() => TestOTP()}>
          Send Test email
          </button>
      </div>
  );
}