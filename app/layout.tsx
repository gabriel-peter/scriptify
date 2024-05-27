import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DashboardNavigationBar from "../components/nav/main-nav";
import {getOptionalUserProfile} from "@/app/actions/user/get";
import { Suspense } from "react";
import NavLayout from "@/components/nav/stacked-nav";
import ThemeProvider from "./theme-context";
import Script from "next/script";

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
    <html lang="en" className="bg-white lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950">
      <Script>
      {`!function(){try{var d=document.documentElement,c=d.classList;c.remove('light','dark');var e=localStorage.getItem('theme');if('system'===e||(!e&&true)){var t='(prefers-color-scheme: dark)',m=window.matchMedia(t);if(m.media!==t||m.matches){d.style.colorScheme = 'dark';c.add('dark')}else{d.style.colorScheme = 'light';c.add('light')}}else if(e){c.add(e|| '')}if(e==='light'||e==='dark')d.style.colorScheme=e}catch(e){}}()`}
</Script>
      <body className={inter.className}>
      {/* <ThemeProvider> */}
        {/* <DashboardNavigationBar loggedInUser={loggedInUser} /> */}
        <NavLayout loggedInUser={loggedInUser}>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
        </NavLayout>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
