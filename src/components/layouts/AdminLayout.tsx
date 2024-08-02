import AdminHeader from "../ui/AdminHeader";
import { ReactNode, Suspense } from "react";
import AdminSidebar from "../ui/AdminSidebar";
import { getUserNotificationsUnreadCount } from "@/actions/global/notificationsModule/get-user-notifications";
import FloatingWhatsAppButton from "../core/FloatingWhatsAppButton";
import { HeroPattern } from "../ui/commons/HeroPattern";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const notificationsCount = await getUserNotificationsUnreadCount();

  return (
    <main className="relative w-full text-primary">
      <AdminSidebar />{" "}
      <div className="lg:pl-72 h-screen overflow-y-auto relative bg-main">
        <Suspense fallback={null}>
          <AdminHeader notificationsCount={notificationsCount} />
        </Suspense>
        <HeroPattern />
        <div className="py-3 relative lg:pt-[5%]  z-20">
          <div className="mx-auto bg-transparent  px-4 lg:px-8">{children}</div>
        </div>
      </div>{" "}
      <FloatingWhatsAppButton />
    </main>
  );
}
