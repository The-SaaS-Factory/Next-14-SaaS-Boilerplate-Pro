import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Complete onboarding",
};

export default async function OnboardingRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
