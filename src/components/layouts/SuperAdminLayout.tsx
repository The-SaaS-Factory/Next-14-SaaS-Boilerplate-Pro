import SuperAdminHeader from "../ui/SuperAdminHeader";
import { ReactNode } from "react";
import SuperAdminSidebar from "../ui/SuperAdminSidebar";
import { getUserNotificationsUnreadCount } from "@/actions/global/notificationsModule/get-user-notifications";
import { HeroPattern } from "../ui/commons/HeroPattern";

export default async function SuperAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const notificationsCount = await getUserNotificationsUnreadCount();
  return (
    <main className="relative  text-primary">
      <SuperAdminSidebar />
      <div className="lg:pl-72 h-screen overflow-y-auto relative bg-main">
        <SuperAdminHeader notificationsCount={notificationsCount} />
        <HeroPattern />

        <div className="py-3 mt-8 relative lg:pt-[5%]  z-20 ">
          <div className="mx-auto bg-transparent  px-4 lg:px-8">{children}</div>
        </div>
      </div>{" "}
    </main>
  );
}
