import React, { ReactNode } from "react";
import PageName from "@/components/ui/commons/PageName";
import { Metadata } from "next";
import CastingsTabs from "./ui/CastingsTabs";

export const metadata: Metadata = {
  title: "Castings",
};

const ServiceActivesRoot = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <PageName
        name={"Castings"}
        breadcrumbs={[
          { name: "Dashboard", href: "/admin" },
          {
            name: "Castings",
            href: "/home/admin/castings/actives",
          },
        ]}
        btn1={
          {
            href: "/home/admin/castings/add",
            name: "Publicar casting",
          }
        }
      />
      <CastingsTabs />
      <div className="py-3">{children}</div>
    </div>
  );
};

export default ServiceActivesRoot;
