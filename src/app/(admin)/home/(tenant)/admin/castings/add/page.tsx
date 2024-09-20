import PageName from "@/components/ui/commons/PageName";
import React from "react";
import { Metadata } from "next";
import { CreateCasting } from "./components/CreateCasting";

export const metadata: Metadata = {
  title: "Publicar Casting",
};

const AgencyCastingCreatePage = () => {
  return (
    <div>
      <PageName name={"New Casting"} isSubPage={true} />

      <CreateCasting></CreateCasting>
    </div>
  );
};

export default AgencyCastingCreatePage;
