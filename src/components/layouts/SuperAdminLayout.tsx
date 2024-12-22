import SuperAdminHeader from "./SuperAdminHeader";
import { ReactNode, Suspense } from "react";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import FullLoader from "../ui/loaders/FullLoader";
import ForbiddenPage from "./errors/ForbiddenPage";
import { HeroPattern } from "../ui/commons/HeroPattern";
import { isSuperAdmin } from "@/utils/facades/serverFacades/securityFacade";
import { getUserNotificationsUnreadCount } from "@/actions/global/notificationsModule/get-user-notifications";
import { SuperAdminSidebar } from "./SuperAdminSidebar";
import { SidebarProvider } from "../ui/sidebar";

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
    <SidebarProvider>
      <main className="text-primary flex w-full">
        <Suspense fallback={<FullLoader />}>
          <HeroPattern />
          <SuperAdminSidebar />
          <div className="bg-main relative w-full flex-col">
            <SuperAdminHeader
              userMembership={userMembership}
              notificationsCount={notificationsCount} //Fix This
            />
            <div className="relative z-20 w-full py-3">
              <div className="mx-auto bg-transparent px-4 lg:px-8">
                {children}
              </div>
            </div>
          </div>
        </Suspense>
      </main>
    </SidebarProvider>
  );
}
