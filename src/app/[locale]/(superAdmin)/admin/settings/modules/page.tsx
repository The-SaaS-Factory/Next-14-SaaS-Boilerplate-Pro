import { getAllSuperAdminSettings } from "@/actions/superAdmin/superAdminSettingsModule/get-superadmin-settings";
import NewForm from "@/components/core/NewForm";
import React from "react";
import { saveSuperAdminSettings } from "@/actions/superAdmin/superAdminSettingsModule/save-superadmin-settings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "General Settings",
};
const SuperAdminSettingsModuleGeneralPage = async () => {
  const { data: getSettings } = await getAllSuperAdminSettings();
  const formInfo = {
    name: "Support Module",
    description: "General Settings Configuration",
  };

  const fields = [
    {
      name: "SUPPORT_MODULE_ENABLED",
      label: "Activar Sistema de Ticket",
      type: "toggle",
      required: false,
    },
    {
      name: "SUPPORT_MODULE_SLACK_LINK",
      label: "Slack Link",
      type: "text",
      required: false,
    },
    {
      name: "SUPPORT_MODULE__EMAIL",
      label: "Email Contact",
      type: "text",
      required: false,
    },
    {
      name: "SUPPORT_MODULE_HELPER_CENTER",
      label: "Helper Center",
      type: "text",
      required: false,
    },
  ];

  return (
    <div>
      <NewForm
        values={getSettings}
        info={formInfo}
        fields={fields}
        onSubmit={saveSuperAdminSettings}
        isSettingForm={true}
      />{" "}
    </div>
  );
};

export default SuperAdminSettingsModuleGeneralPage;
