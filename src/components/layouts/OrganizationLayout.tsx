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
import { getUserAllOrganizations } from "@/actions/admin/userModule/get-user-all-profiles";
export default async function OrganizationLayout({
  children,
}: {
  children: ReactNode;
}) {
  const notificationsCount = await getUserNotificationsUnreadCount();
  const { organization, userMembership } = await getMembership();
  const profiles = await getUserAllOrganizations();
  return (
    <Suspense fallback={<FullLoader />}>
      <SidebarProvider>
        <main className="text-primary relative w-full">
          <div className="flex w-full">
            <HeroPattern />
            <OrganizationAdminSidebar
              profile={organization}
              agencyPermissions={[]}
              membershipPermissions={userMembership.permissions}
            />{" "}
            <div className="bg-main w-full flex-col">
              <Suspense fallback={null}>
                <TenantAdminHeader
                 organizations={profiles}
                  userMembership={userMembership}
                  notificationsCount={notificationsCount ?? 0}
                  organization={organization}
                />
              </Suspense>
              <div className="relative z-10 mx-auto w-full bg-transparent px-4 py-3 lg:px-8">
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
