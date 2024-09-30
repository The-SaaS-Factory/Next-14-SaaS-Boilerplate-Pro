import { ReactNode } from "react";
import AuthSessionHandler from "@/components/core/AuthSessionHandler";
import SessionWrapper from "@/components/core/SessionWrapper";
import { SectionProvider } from "@/components/ui/SectionProvider";
import TenantAdminLayout from "@/components/layouts/TenantAdminLayout";

const AdminRoot = async ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <SectionProvider sections={[]}>
        <SessionWrapper>
          <AuthSessionHandler>
            <div>
              <TenantAdminLayout>{children}</TenantAdminLayout>
            </div>
          </AuthSessionHandler>
        </SessionWrapper>
      </SectionProvider>
    </main>
  );
};
export default AdminRoot;
