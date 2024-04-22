import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DashboardLayout from "./components/layouts/main-layout";
import { UserProvider } from '@auth0/nextjs-auth0/client';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Scriptify",
  description: "TODO",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <UserProvider> */}
        <body className={inter.className}>
          <DashboardLayout>
            <main>
              {children}
            </main>
          </DashboardLayout>
        </body>
      {/* </UserProvider> */}
    </html>
  );
}
