import PageName from "@/components/ui/commons/PageName";
import React from "react";
import UpsertCapabilitie from "../ui/UpsertCapabilitie";

const page = () => {
  return (
    <div>
      <PageName isSubPage={true} name={"New  Capability"} />
      <UpsertCapabilitie />
    </div>
  );
};

export default page;
