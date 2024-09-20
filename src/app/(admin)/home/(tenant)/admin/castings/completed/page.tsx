import PageName from "@/components/ui/commons/PageName";
import React from "react";
import { Metadata } from "next";
import { CastingStatus } from "@prisma/client";
import AllCastingList from "../ui/AllCastingList";

export const metadata: Metadata = {
  title: "Castings abiertos",
};

const AgencyCastingCompletedPage = () => {
  return (
    <div>
      <PageName name={"Castings completados"} isSubPage={true} />
      <AllCastingList status={CastingStatus.COMPLETED} />
    </div>
  );
};

export default AgencyCastingCompletedPage;
