"use client";
import React from "react";
import Tabs from "@/components/core/Tabs";
import {
  ClipboardDocumentCheckIcon,
  DocumentArrowDownIcon,
  FlagIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";
import {} from "@heroicons/react/24/solid";

const CastingsTabs = () => {
  const tabs = [
    {
      path: `/home/admin/castings/all`,
      label: "Todos",
      icon: ListBulletIcon,
    },
    {
      path: `/home/admin/castings/open`,
      label: "Activos",
      icon: DocumentArrowDownIcon,
    },
    {
      path: `/home/admin/castings/actives`,
      label: "En proceso",
      icon: ClipboardDocumentCheckIcon,
    },
    {
      path: `/home/admin/castings/completed`,
      label: "Completados",
      icon: FlagIcon,
    },
  ];
  return (
    <div>
      <Tabs tabs={tabs} />
    </div>
  );
};

export default CastingsTabs;
