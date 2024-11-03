import React from "react";
import { Toaster } from "sonner";
import "./globals.css";

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
      </body>
    </html>
  );
}
