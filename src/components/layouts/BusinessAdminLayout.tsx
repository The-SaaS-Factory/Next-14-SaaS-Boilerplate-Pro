import { ReactNode, Suspense } from "react";
import { getUserNotificationsUnreadCount } from "@/actions/global/notificationsModule/get-user-notifications";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import TenantAdminHeader from "../ui/TenantAdminHeader";
import TenantAdminSidebar from "../ui/TenantAdminSidebar";
import FullLoader from "../ui/loaders/FullLoader";
import { HeroPattern } from "../ui/commons/HeroPattern";
import CompleteOnBoarding from "@/app/(admin)/home/(tenant)/admin/configuraciones/components/CompleteOnBoarding";
import { redirect } from "next/navigation";
export default async function BusinessAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const notificationsCount = await getUserNotificationsUnreadCount();

  const { profile, permissions, profileMembership } = await getMembership();

  const isAdmin =
    permissions.includes("superAdmin:totalAccess") ||
    permissions.includes("superAdmin:administration:read");

  if (isAdmin) {
    redirect("/admin");
  }

  return (
    <Suspense fallback={<FullLoader />}>
      <main className="relative text-primary">
        <HeroPattern />
        <TenantAdminSidebar profile={profile} />{" "}
        <div className="lg:pl-72 h-screen overflow-y-auto relative ">
          <Suspense fallback={null}>
            <TenantAdminHeader
              profileMembership={profileMembership}
              notificationsCount={notificationsCount}
              agencyPermissions={profile.permissions}
              membershipPermissions={permissions}
              profile={profile}
            />
          </Suspense>
          <div className="py-3 relative lg:pt-[5%]  z-20">
            <div className="mx-auto bg-transparent  px-4 lg:px-8">
              {children}
            </div>
          </div>
        </div>{" "}
      </main>
      <CompleteOnBoarding />
    </Suspense>
  );
}
