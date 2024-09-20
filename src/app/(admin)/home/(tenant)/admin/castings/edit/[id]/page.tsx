import React, { Suspense } from "react";
import { Metadata } from "next";
import PageName from "@/components/ui/commons/PageName";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import TableLoaderSkeleton from "@/components/ui/loaders/TableLoaderSkeleton";
import { getCastingDetails } from "@/actions/admin/castingModule/get-casting-details";
import { CreateCasting } from "../../add/components/CreateCasting";

export const metadata: Metadata = {
  title: "Edit casting",
};

const CastingRoleEditPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const casting = await getCastingDetails(Number(params.id));
  return (
    <div>
      <PageName name={"Edit Casting Category"} isSubPage={true} />
      <div className="flex items-center py-2 lg:px-7 ">
        <Link href={`/home/admin/castings/all`}>
          <button className="btn-icon ">
            <ArrowLeftCircleIcon className="w-6 h-6" /> Atrás
          </button>
        </Link>
      </div>
      <Suspense fallback={<TableLoaderSkeleton count={4} />}>
        {casting && (
          <CreateCasting modelId={parseInt(params.id)}></CreateCasting>
        )}
      </Suspense>
    </div>
  );
};

export default CastingRoleEditPage;
