import { ReactNode, Suspense } from "react";
import { getUserNotificationsUnreadCount } from "@/actions/global/notificationsModule/get-user-notifications";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import FullLoader from "../ui/loaders/FullLoader";
import { HeroPattern } from "../ui/commons/HeroPattern";
import { isSuperAdmin } from "@/utils/facades/serverFacades/securityFacade";
import { saasFeatures } from "@/lib/constants";
import CompleteOnBoarding from "@/app/(admin)/home/(all)/settings/organization/settings/components/CompleteOnBoarding";
import { UpdateClientCache } from "../core/UpdateClientCache";
import { RedirectSuperAdmin } from "../core/RedirectSuperAdmin";
import { OrganizationAdminSidebar } from "./TenantSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import TenantAdminHeader from "./TenantAdminHeader";
export default async function OrganizationLayout({
  children,
}: {
  children: ReactNode;
}) {
  const notificationsCount = await getUserNotificationsUnreadCount();
  const { organization, userMembership } = await getMembership();

  return (
    <Suspense fallback={<FullLoader />}>
      <SidebarProvider>
        <main className="text-primary flex w-full">
          <HeroPattern />
          <OrganizationAdminSidebar
            profile={organization}
            agencyPermissions={[]}
            membershipPermissions={userMembership.permissions}
          />{" "}
          <div className="bg-main relative w-full flex-col">
            <Suspense fallback={null}>
              <TenantAdminHeader
                userMembership={userMembership}
                notificationsCount={notificationsCount ?? 0}
                organization={organization}
              />
            </Suspense>
            <div className="relative z-20 w-full py-3">
              <div className="mx-auto bg-transparent px-4 lg:px-8">
                {children}
              </div>
            </div>
          </div>
        </main>
      </SidebarProvider>

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
