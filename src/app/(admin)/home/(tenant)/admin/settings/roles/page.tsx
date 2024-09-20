import PageName from "@/components/ui/commons/PageName";
import React from "react";
import { Metadata } from "next";
import RolesList from "../ui/RolesList";

export const metadata: Metadata = {
  title: "Roles de castings",
};

const AgencyCastingRolesPage = () => {
  return (
    <div>
      <PageName
        name={"Roles de castings"}
        isSubPage={true}
        btn1={{
          name: "Nuevo rol",
          href: "/home/admin/settings/roles/add",
        }}
      />
      <div className="   ">
        <RolesList />
      </div>
    </div>
  );
};

export default AgencyCastingRolesPage;
