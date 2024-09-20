import React from "react";
import { Toaster } from "sonner";
import "./globals.css";
export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        {children}
        <Toaster duration={1000} richColors={true} position="top-center" />
      </body>
    </html>
  );
}
