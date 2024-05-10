import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DashboardNavigationBar from "../components/nav/main-nav";
import {getOptionalUserProfile} from "@/app/api/user-actions/actions";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ScriptifyRx",
  description: "TODO",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedInUser = await getOptionalUserProfile()
  return (
    <html lang="en">
      <body className={inter.className}>
        <DashboardNavigationBar loggedInUser={loggedInUser} />
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {/* <Suspense fallback={<p>LOADING</p>}> TODO causes react-hydration-error #nextjs */}
            {children}
            {/* </Suspense> */}
          </div>
        </main>
      </body>
    </html>
  );
}
