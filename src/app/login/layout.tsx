import { Metadata } from "next";
import { ReactNode, Suspense } from "react";

export const metadata: Metadata = {
  title: "Login",
};

export default async function PageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main>
      <Suspense fallback={null}>{children}</Suspense>
    </main>
  );
}
