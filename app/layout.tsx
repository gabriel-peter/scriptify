import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DashboardNavigationBar from "../components/nav/main-nav";
import {getOptionalUserProfile} from "@/app/actions/user/get";
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
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
