import React from "react";
import { Metadata } from "next";
import UpsertCurrency from "../ui/UpsertCurrency";
import PageName from "@/components/ui/commons/PageName";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Title",
};

const SuperAdmiNAddNewCurrency = () => {
  return (
    <div>
      <PageName name={" Nueva cuenta de saldo"} isSubPage={true} />
      <div className="flex items-center py-2 lg:px-7">
        <Link href="/admin/settings/billing">
          <button className="btn-icon">
            <ArrowLeftCircleIcon className="h-6 w-6" /> Back
          </button>
        </Link>
      </div>
      <UpsertCurrency />
    </div>
  );
};

export default SuperAdmiNAddNewCurrency;
