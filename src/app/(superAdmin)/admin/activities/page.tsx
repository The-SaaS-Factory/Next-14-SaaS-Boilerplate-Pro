import { Metadata } from "next";
import PageName from "@/components/ui/commons/PageName";
import ActivitiesList from "./components/ActivitiesList";
import { getActivities } from "@/actions/admin/activitiesModule/get-activities";
import { Suspense } from "react";
import PageLoader from "@/components/ui/loaders/PageLoader";
import Pagination from "@/components/ui/commons/Pagination";

export const metadata: Metadata = {
  title: "Activities",
};

const ActivitiesPage = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const currentPage = Number(searchParams?.page) || 1;
  const limit = 20;
  const offset = (currentPage - 1) * limit;

  const { data, totalPages, totalCount } = await getActivities({
    args: {
      limit,
      offset,
      search: searchParams,
    },
  });

  return (
    <div>
      <PageName name={"Activities"} />

      <Suspense
        fallback={
          <div>
            <PageLoader />
          </div>
        }
      >
        <ActivitiesList data={data}></ActivitiesList>

        <div className="flex mt-7 justify-between">
          <Pagination
            totalPages={totalPages}
            totalCount={totalCount}
            offset={offset}
            dataLength={data.length}
          />
        </div>
      </Suspense>
    </div>
  );
};

export default ActivitiesPage;
