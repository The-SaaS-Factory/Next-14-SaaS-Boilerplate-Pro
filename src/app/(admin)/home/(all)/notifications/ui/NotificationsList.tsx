import NotFound from "@/components/layouts/errors/NotFound";
import Pagination from "@/components/ui/commons/Pagination";
import { Suspense } from "react";
import TableLoaderSkeleton from "@/components/ui/loaders/TableLoaderSkeleton";
import NotificationCard from "./NotificationCard";
import { Notification } from "@prisma/client";
import { getUserNotifications } from "@/actions/global/notificationsModule/get-user-notifications";

const NotificationsList = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const search = query || "";
  const limit = 20;
  const offset = (currentPage - 1) * limit;

  const { data, totalPages, totalCount } = await getUserNotifications({
    args: {
      search,
      limit,
      offset,
    },
  });

  return (
    <div>
      <Suspense fallback={<TableLoaderSkeleton count={10} />}>
        {data.length === 0 ? (
          <div className="flex h-96 items-center justify-center">
            <NotFound message="No notifications found" />
          </div>
        ) : (
          <div className="flex flex-col">
            <ul role="list" className="flex flex-col">
              {data?.map((notification: Notification) => (
                <li
                  key={notification.id}
                  className="overflow-hidden rounded-xl border border-gray-200 px-3"
                >
                  <NotificationCard notification={notification} />
                </li>
              ))}
            </ul>

            <div className="mt-7 flex justify-between">
              <Pagination
                offset={offset}
                dataLength={data.length}
                totalCount={totalCount}
                totalPages={totalPages}
              />
            </div>
          </div>
        )}{" "}
      </Suspense>
    </div>
  );
};

export default NotificationsList;
