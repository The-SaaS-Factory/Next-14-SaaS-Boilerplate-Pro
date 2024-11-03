import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Super Admin Dashboard",
};

export default function SuperAdminLayoutRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
