import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DashboardNavigationBar from "./components/nav/main-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ScriptifyRx",
  description: "TODO",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">      
      <body className={inter.className}>
      {/* <DashboardLayout /> */}
        <main>
            {children}
          {/* </div> */}
        </main>
      </body>
    </html>
  );
}
