import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToasterProvider } from "@/providers/toast-provider";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Code Challenge",
  description: "Paint the walls",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        {children}
        <ToasterProvider />
      </body>
    </html>
  );
}
