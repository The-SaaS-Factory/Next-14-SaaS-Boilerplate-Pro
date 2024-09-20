import PageName from "@/components/ui/commons/PageName";
import React from "react";
import { Metadata } from "next";
import { CastingStatus } from "@prisma/client";
import AllCastingList from "../ui/AllCastingList";

export const metadata: Metadata = {
  title: "Castings abiertos",
};

const AgencyCastingOpenPage = () => {
  return (
    <div>
      <PageName name={"Castings abiertos"} isSubPage={true} />
      <AllCastingList status={CastingStatus.OPEN} />
    </div>
  );
};

export default AgencyCastingOpenPage;
