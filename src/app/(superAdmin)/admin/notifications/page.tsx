import NotificationsList from "@/app/(admin)/home/(all)/notifications/ui/NotificationsList";
import PageName from "@/components/ui/commons/PageName";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notifications",
};

const NotificationsPage = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    paymentStatus?: string;
  };
}) => {
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query || "";

  return (
    <div>
      <PageName name={"Notifications"} />
      <NotificationsList query={query} currentPage={currentPage} />
    </div>
  );
};

export default NotificationsPage;
