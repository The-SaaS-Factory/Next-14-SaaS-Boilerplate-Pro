import SuperAdminHeader from "../ui/SuperAdminHeader";
import { ReactNode, Suspense } from "react";
import SuperAdminSidebar from "../ui/SuperAdminSidebar";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import FullLoader from "../ui/loaders/FullLoader";
import ForbiddenPage from "./errors/ForbiddenPage";
import { HeroPattern } from "../ui/commons/HeroPattern";
import { isSuperAdmin } from "@/utils/facades/serverFacades/securityFacade";
import { getUserNotificationsUnreadCount } from "@/actions/global/notificationsModule/get-user-notifications";

export default async function SuperAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { userMembership } = await getMembership();

  if (!isSuperAdmin(userMembership)) {
    return <ForbiddenPage />;
  }

  const notificationsCount = await getUserNotificationsUnreadCount();

  return (
    <main className="relative bg-main   text-primary">
      <Suspense fallback={<FullLoader />}>
        <HeroPattern />
        <SuperAdminSidebar />
        <div className="lg:pl-72 h-screen overflow-y-auto relative ">
          <SuperAdminHeader
            notificationsCount={notificationsCount} //Fix This
          />
          <div className="py-3 relative   lg:pt-[5%]   ">
            <div className="mx-auto  px-4 lg:px-8">{children}</div>
          </div>
        </div>{" "}
      </Suspense>
    </main>
  );
}
