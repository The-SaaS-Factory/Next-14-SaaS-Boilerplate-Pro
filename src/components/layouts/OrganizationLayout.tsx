import { ReactNode, Suspense } from "react";
import { getUserNotificationsUnreadCount } from "@/actions/global/notificationsModule/get-user-notifications";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import TenantAdminHeader from "../ui/TenantAdminHeader";
import FullLoader from "../ui/loaders/FullLoader";
import { HeroPattern } from "../ui/commons/HeroPattern";
import { isSuperAdmin } from "@/utils/facades/serverFacades/securityFacade";
import { saasFeatures } from "@/lib/constants";
import CompleteOnBoarding from "@/app/(admin)/home/(all)/settings/organization/settings/components/CompleteOnBoarding";
import { UpdateClientCache } from "../core/UpdateClientCache";
import OrganizationAdminSidebar from "../ui/TenantAdminSidebar";
import { RedirectSuperAdmin } from "../core/RedirectSuperAdmin";
export default async function OrganizationLayout({
  children,
}: {
  children: ReactNode;
}) {
  const notificationsCount = await getUserNotificationsUnreadCount();
  const { organization, userMembership } = await getMembership();

  return (
    <Suspense fallback={<FullLoader />}>
      <main className="relative bg-main  text-primary">
        <HeroPattern />
        <OrganizationAdminSidebar />{" "}
        <div className="lg:pl-[15%] h-screen overflow-y-auto relative ">
          <Suspense fallback={null}>
            <TenantAdminHeader
              userMembership={userMembership}
              notificationsCount={notificationsCount ?? 0}
              organization={organization}
            />
          </Suspense>
          <div className="py-3 relative lg:pt-[5%]   ">
            <div className="px-4 lg:px-2 pt-2">{children}</div>
          </div>
        </div>{" "}
      </main>

      <UpdateClientCache
        organization={organization}
        userMembership={userMembership}
      />
      <RedirectSuperAdmin redirect={isSuperAdmin(userMembership)} />
      {saasFeatures.onboarding && (
        <CompleteOnBoarding
          isOnboardingCompleted={organization.isOnboardingCompleted ?? false}
        />
      )}
    </Suspense>
  );
}
