import { ReactNode, Suspense } from "react";
import { getUserNotificationsUnreadCount } from "@/actions/global/notificationsModule/get-user-notifications";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import TenantAdminHeader from "../ui/TenantAdminHeader";
import TenantAdminSidebar from "../ui/TenantAdminSidebar";
import FullLoader from "../ui/loaders/FullLoader";
import { HeroPattern } from "../ui/commons/HeroPattern";
import { redirect } from "next/navigation";
import { isSuperAdmin } from "@/utils/facades/serverFacades/securityFacade";
import { saasFeatures } from "@/lib/constants";
import CompleteOnBoarding from "@/app/(admin)/home/(all)/settings/organization/settings/components/CompleteOnBoarding";
import { UpdateClientCache } from "../core/UpdateClientCache";
export default async function OrganizationLayout({
  children,
}: {
  children: ReactNode;
}) {
  const notificationsCount = await getUserNotificationsUnreadCount();

  const { organization, userMembership } = await getMembership();

  if (isSuperAdmin(userMembership)) {
    redirect("/admin");
  }
  

  return (
    <Suspense fallback={<FullLoader />}>
      <main className="relative bg-main  text-primary">
        <HeroPattern />
        <TenantAdminSidebar org={organization} />{" "}
        <div className="lg:pl-72 h-screen overflow-y-auto relative ">
          <Suspense fallback={null}>
            <TenantAdminHeader
              userMembership={userMembership}
              notificationsCount={notificationsCount ?? 0}
              organization={organization}
            />
          </Suspense>
          <div className="py-3 relative lg:pt-[5%]   ">
            <div className="mx-auto  px-4 lg:px-8">{children}</div>
          </div>
        </div>{" "}
      </main>
      {saasFeatures.onboarding && (
        <CompleteOnBoarding
          isOnboardingCompleted={organization.isOnboardingCompleted ?? false}
        />
      )}
      <UpdateClientCache
        organization={organization}
        userMembership={userMembership}
      />
    </Suspense>
  );
}
