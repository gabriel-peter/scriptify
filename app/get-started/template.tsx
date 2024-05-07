"use server"

import ProtectedPage from "@/components/auth/protected-page";

export default async function AuthTemplate({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <ProtectedPage>
          {children}
      </ProtectedPage>
    );
  }