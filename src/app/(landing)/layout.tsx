import type { Metadata } from "next";
import React, { Suspense } from "react";
import FloatingWhatsAppButton from "@/components/core/FloatingWhatsAppButton";
import SessionWrapper from "@/components/core/SessionWrapper";
import { constants } from "@/lib/constants";
import { HeaderLanding } from "./ui/HeaderLanding";

export const metadata: Metadata = {
  title: constants.appName,
  description: constants.appResume,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative">
      <Suspense fallback={null}>
        <SessionWrapper>
          <HeaderLanding />
          {children}
          <FloatingWhatsAppButton />
        </SessionWrapper>
      </Suspense>
    </main>
  );
}
