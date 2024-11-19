import React from "react";
import { Toaster } from "sonner";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
//import HotJar from "@/components/marketing/Hotjat";
//import { GoogleAnalytics } from '@next/third-parties/google'
export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/favicon.ico" sizes="any" />
      </head>
      <body>
        {children}
        <Toaster duration={2000} richColors={true} position="top-center" />
        {/* <HotJar /> You cant setting it in constans.hotjarId */}
        <Analytics /> {/* Vercel Analytics */}
        {/* <GoogleAnalytics /> */}
      </body>
    </html>
  );
}
