import type { Metadata } from "next";
import "@radix-ui/themes/styles.css";
import './theme-config.css';
import "./globals.css";
import { Theme } from "@radix-ui/themes";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Task manager",
  description: "Task manager for Payback",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className={`antialiased h-screen`}
      >
        <Theme>
          <NavBar />
          <main className="p-5">{children}</main>
        </Theme>
      </body>
    </html>
  );
}
