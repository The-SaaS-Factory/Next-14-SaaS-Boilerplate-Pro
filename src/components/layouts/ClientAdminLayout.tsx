import { HeaderLanding } from "@/app/(landing)/ui/HeaderLanding";
import { ReactNode, Suspense } from "react";

export default async function ClientAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="relative text-primary">
      <div className="lg:pl-72 h-screen overflow-y-auto relative bg-main">
        <Suspense fallback={null}>
          <HeaderLanding />
        </Suspense>
        <div className="py-3  ">
          <div className="mx-auto   px-4  ">{children}</div>
        </div>
      </div>{" "}
    </main>
  );
}
