import PageName from "@/components/ui/commons/PageName";
import React, { Suspense } from "react";
import { Metadata } from "next";
import TableLoaderSkeleton from "@/components/ui/loaders/TableLoaderSkeleton";
import { getTenantPluginDetails } from "@/actions/global/pluginsSystem/get-tenant-plugin";
import { UpsertPluginConfiguration } from "./UpsertPluginConfiguration";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "View details de la factura ",
};

const TenantViewPluginDetails = async ({
  params,
}: {
  params: { pluginSlug: string };
}) => {
  const plugin = await getTenantPluginDetails(params?.pluginSlug);
  console.log(plugin);

  if (!plugin) {
    redirect("/home/plugins");
  }

  return (
    <div>
      <Suspense fallback={<TableLoaderSkeleton count={10} />}>
        <PageName
          name={"Configuración de " + plugin?.plugin?.name}
          isSubPage={true}
        />

        <div>
          <UpsertPluginConfiguration />
        </div>
      </Suspense>
    </div>
  );
};

export default TenantViewPluginDetails;
