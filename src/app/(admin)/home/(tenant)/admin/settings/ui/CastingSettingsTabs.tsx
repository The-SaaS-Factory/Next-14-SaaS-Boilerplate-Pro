"use client";
import React from "react";
import Tabs from "@/components/core/Tabs";
import {
  ClipboardDocumentCheckIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";
import {} from "@heroicons/react/24/solid";

const CastingSettingsTabs = () => {
  const tabs = [
    {
      path: `/home/admin/settings/roles`,
      label: "Roles",
      icon: DocumentArrowDownIcon,
    },
    {
      path: `/home/admin/settings/informations`,
      label: "Datos para aplicaciones",
      icon: ClipboardDocumentCheckIcon,
    },
  ];
  return (
    <div>
      <Tabs tabs={tabs} />
    </div>
  );
};

export default CastingSettingsTabs;
