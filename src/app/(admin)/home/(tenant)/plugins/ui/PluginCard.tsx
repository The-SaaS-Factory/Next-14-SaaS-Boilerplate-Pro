"use client";
import { installPlugin } from "@/actions/global/pluginsSystem/install-plugin";
import { uninstallPlugin } from "@/actions/global/pluginsSystem/unistall-plugin";
import { Button } from "@tremor/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const PluginCard = ({ plugin }: { plugin: any }) => {
  const navigate = useRouter();

  const handleInstallPlugin = async () => {
    await installPlugin(plugin.id)
      .then(() => {
        toast.success("Plugin instalado correctamente");
      })
      .catch(() => {
        toast.error("No se pudo instalar el plugin");
      });
  };
  const handleUnInstallPlugin = async () => {
    await uninstallPlugin(plugin.id)
      .then(() => {
        toast.success("Plugin desintalado correctamente");
      })
      .catch(() => {
        toast.error("No se pudo desintalar el plugin");
      });
  };

  return (
    <div
      key={plugin.id}
      className="overflow-hidden rounded-xl border border-gray-200"
    >
      <div className="flex items-center flex-wrap gap-x-4 border-b border-gray-900/5 bg-main p-6">
        <Image
         width={100}
         height={100}
          src={plugin.logo ?? "/assets/img/avatar.png"}
          alt={plugin.name}
          className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
        />
        <div className="flex flex-col">
          <div className="text-sm font-medium leading-6 text-gray-900">
            {plugin.name}
          </div>
          <div className="text-sm font-medium leading-6 text-gray-500">
            {plugin.description}
          </div>
        </div>
        <div>
          {plugin.installed ? (
            <div className="flex flex-col space-y-3">
              <Button
                onClick={() => handleUnInstallPlugin()}
                variant="secondary"
              >
                Desintalar
              </Button>
              <Button
                onClick={() => navigate.push(plugin.slug as string)}
                variant="primary"
              >
                Configurar
              </Button>
            </div>
          ) : (
            <Button onClick={() => handleInstallPlugin()}>Instalar</Button>
          )}
        </div>
      </div>
      <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-primary">Por</dt>
          <dd className="flex items-start gap-x-2">
            <div className="font-medium text-primary">{plugin.developer}</div>
          </dd>
        </div>
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-primary">Instalaciones</dt>
          <dd className="flex items-start gap-x-2">
            <div className="font-medium text-primary">
              {plugin._count?.installations}
            </div>
          </dd>
        </div>
      </dl>
    </div>
  );
};
