import SuperAdminHeader from "../ui/SuperAdminHeader";
import { ReactNode, Suspense } from "react";
import SuperAdminSidebar from "../ui/SuperAdminSidebar";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import FullLoader from "../ui/loaders/FullLoader";
import ForbiddenPage from "./errors/ForbiddenPage";
import { HeroPattern } from "../ui/commons/HeroPattern";

export default async function SuperAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { organization, userMembership } = await getMembership();

  const isAdmin =
    organization.permissions
      .map((p) => p.name)
      .includes("superAdmin:totalAccess") ||
    userMembership.permissions
      .map((p) => p.name)
      .includes("superAdmin:administration:read");

  if (!isAdmin) {
    return <ForbiddenPage />;
  }

  return (
    <main className="relative  text-primary">
      <Suspense fallback={<FullLoader />}>
        <HeroPattern />
        <SuperAdminSidebar />
        <div className="lg:pl-72 h-screen overflow-y-auto relative ">
          <SuperAdminHeader
            organization={organization}
            notificationsCount={0} //Fix This
          />
          <div className="py-3 relative lg:pt-[5%]  z-20">
            <div className="mx-auto bg-transparent  px-4 lg:px-8">
              {children}
            </div>
          </div>
        </div>{" "}
      </Suspense>
    </main>
  );
}
