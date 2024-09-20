import PageName from "@/components/ui/commons/PageName";
import React from "react";
import { Metadata } from "next";
import UpsertCastingRole from "../../ui/UpsertCastingRole";
import Link from "next/link";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Nuevo Rol",
};

const AgencyCastingRolePage = () => {
  return (
    <div>
      <PageName name={"Nuevo Rol de Casting"} isSubPage={true} />
      <div className="flex items-center py-2 lg:px-7 ">
        <Link href={`/home/admin/settings/roles`}>
          <button className="btn-icon ">
            <ArrowLeftCircleIcon className="w-6 h-6" /> Atrás
          </button>
        </Link>
      </div>

      <UpsertCastingRole />
    </div>
  );
};

export default AgencyCastingRolePage;
