import React, { Suspense } from "react";
import { Metadata } from "next";
import PageName from "@/components/ui/commons/PageName";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import TableLoaderSkeleton from "@/components/ui/loaders/TableLoaderSkeleton";
import { getCastingInformationsDetails } from "@/actions/admin/castingModule/get-casting-information-details";
import UpsertCastingInformations from "../../../ui/UpsertCastingInformations";

export const metadata: Metadata = {
  title: "Edit casting information ",
};

const CastingRoleEditPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const information = await getCastingInformationsDetails(Number(params.id));
  return (
    <div>
      <PageName name={"Edit Casting Information"} isSubPage={true} />
      <div className="flex items-center py-2 lg:px-7 ">
        <Link href={` /home/admin/settings/informations`}>
          <button className="btn-icon ">
            <ArrowLeftCircleIcon className="w-6 h-6" /> Atrás
          </button>
        </Link>
      </div>
      <Suspense fallback={<TableLoaderSkeleton count={4} />}>
        {information && (
          <UpsertCastingInformations
            modelId={parseInt(params.id)}
            values={{
              ...information,
            }}
          />
        )}
      </Suspense>
    </div>
  );
};

export default CastingRoleEditPage;
