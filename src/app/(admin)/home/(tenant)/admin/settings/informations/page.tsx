import PageName from "@/components/ui/commons/PageName";
import React from "react";
import { Metadata } from "next";
import InfomationsList from "../ui/InfomationsList";

export const metadata: Metadata = {
  title: "Informaciones para castings",
};

const AgencyCastingRolesPage = () => {
  return (
    <div>
      <PageName
        name={"Informaciones para castings"}
        isSubPage={true}
        btn1={{
          name: "Nueva información ",
          href: " /home/admin/settings/informations/add",
        }}
      />
      <InfomationsList />
    </div>
  );
};

export default AgencyCastingRolesPage;
