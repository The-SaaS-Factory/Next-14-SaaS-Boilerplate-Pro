"use client";

import { usePathname } from "next/navigation";
import { IdeaActions } from "./IdeaActions";
import { GlobalProjectAction } from "./GlobalProjectAction";

export const GetProjectActions = () => {
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();

  return (
    <div className="flex space-x-1">
      {lastSegment === "idea" && <IdeaActions />}
      {/* {lastSegment === "validation" && <ValidationActions />} */}
      <GlobalProjectAction />
    </div>
  );
};
