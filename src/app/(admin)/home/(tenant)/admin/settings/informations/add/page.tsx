import PageName from "@/components/ui/commons/PageName";
import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import UpsertCastingInformations from "../../ui/UpsertCastingInformations";

export const metadata: Metadata = {
  title: "Nueva Información",
};

const AgencyCastingInformationsAddPage = () => {
  return (
    <div>
      <PageName name={"Nueva Información para casting"} isSubPage={true} />
      <div className="flex items-center py-2 lg:px-7 ">
        <Link href={` /home/admin/settings/informations`}>
          <button className="btn-icon ">
            <ArrowLeftCircleIcon className="w-6 h-6" /> Atrás
          </button>
        </Link>
      </div>

      <UpsertCastingInformations />
    </div>
  );
};

export default AgencyCastingInformationsAddPage;
