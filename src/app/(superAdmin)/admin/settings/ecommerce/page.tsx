import { getAllSuperAdminSettings } from "@/actions/superAdmin/superAdminSettingsModule/get-superadmin-settings";
import NewForm from "@/components/core/NewForm";
import React from "react";
import { saveSuperAdminSettings } from "@/actions/superAdmin/superAdminSettingsModule/save-superadmin-settings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ajustes de Ecommerce",
};
const SuperAdminSettingsModuleGeneralPage = async () => {
  const { data: getSettings } = await getAllSuperAdminSettings();
  const formInfo = {
    name: "Ajustes de Ecommerce",
    description:  "Configuración de Ajustes de Ecommerce",
  };

  const fields = [
    {
      name: "ECOMMERCE_TAX_PORCENT",
      label: "% de Impuestos en el Checkput",
      type: "number",
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
