import React, { Suspense } from "react";
import { Metadata } from "next";
import PageName from "@/components/ui/commons/PageName";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import TableLoaderSkeleton from "@/components/ui/loaders/TableLoaderSkeleton";
import UpsertCastingRole from "../../../ui/UpsertCastingRole";
import { getCastingRoleDetails } from "@/actions/admin/castingModule/get-casting-role-details";

export const metadata: Metadata = {
  title: "Edit casting role ",
};

const CastingRoleEditPage = async ({
  params,
}: {
  params: {
    id: string;
    roleId: string;
  };
}) => {
  const role = await getCastingRoleDetails(Number(params.roleId));
  return (
    <div>
      <PageName name={"Edit Casting Role"} isSubPage={true} />
      <div className="flex items-center py-2 lg:px-7 ">
        <Link href={` /home/admin/settings/roles`}>
          <button className="btn-icon ">
            <ArrowLeftCircleIcon className="w-6 h-6" /> Atrás
          </button>
        </Link>
      </div>
      <Suspense fallback={<TableLoaderSkeleton count={4} />}>
        {role && (
          <UpsertCastingRole
            modelId={parseInt(params.roleId)}
            values={{
              ...role,
            }}
          />
        )}
      </Suspense>
    </div>
  );
};

export default CastingRoleEditPage;
