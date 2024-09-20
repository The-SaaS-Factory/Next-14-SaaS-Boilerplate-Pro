import NotFound from "@/components/layouts/errors/NotFound";
import TableLoaderSkeleton from "@/components/ui/loaders/TableLoaderSkeleton";
import { Suspense } from "react";

import Pagination from "@/components/ui/commons/Pagination";
import { getTenantAllPlugins } from "@/actions/global/pluginsSystem/get-tenant-all-plugins";

import { PluginCard } from "./PluginCard";

const TenantPluginList = async ({
  query,
  currentPage,
  
}: {
  query: string;
  currentPage: number;
}) => {
  const search = query || "";
  const limit = 20;
  const offset = (currentPage - 1) * limit;

  const { data, totalPages, totalCount } = await getTenantAllPlugins({
    args: {
      search,
      limit,
      offset,
      status: "ACTIVE",
    },
  });

  return (
    <div>
      <Suspense fallback={<TableLoaderSkeleton count={10} />}>
        {data.length === 0 ? (
          <div className="flex justify-center w-full items-center h-96">
            <NotFound message="No tienes plugins instalados" />
          </div>
        ) : (
          <div className=" ">
            <ul
              role="list"
              className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
            >
              {data?.map((plugin: any) => (
                <PluginCard key={plugin.id} plugin={plugin} />
              ))}
            </ul>

            <div className="flex mt-7 justify-between">
              <Pagination
                offset={offset}
                dataLength={data.length}
                totalCount={totalCount}
                totalPages={totalPages}
              />
            </div>
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default TenantPluginList;
