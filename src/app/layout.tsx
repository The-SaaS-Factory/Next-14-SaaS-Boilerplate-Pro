import React from "react";
import { Toaster } from "sonner";
import "./globals.css";
import HotJar from "@/components/marketing/Hotjat";
import { Analytics } from "@vercel/analytics/react";
export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        {children}
        <Toaster duration={2000} richColors={true} position="top-center" />
        <HotJar />
        <Analytics />
      </body>
    </html>
  );
}
