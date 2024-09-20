"use client";
//import { updateTenantPluginConfiguration } from "@/actions/global/pluginsSystem/update-tenant-plugin-configuration";
//import { Button, TextInput } from "@tremor/react";
//import {   useEffect,  useState } from "react";
//import { toast } from "sonner";

// const loadComponent = (componentName) => {
//   return lazy(() =>
//     import(`@/app/plugins/${componentName}`).catch((err) => {
//       console.error(`Error loading component ${componentName}:`, err);
//       return { default: () => <div>Error loading component</div> };
//     })
//   );
// };

export const UpsertPluginConfiguration = () => {
  //const [plugin, setPlugin] = useState(pluginParams);
  //const [DynamicComponent, setDynamicComponent] = useState(null);
  // const componentName = plugin.plugin?.customComponent;

  // useEffect(() => {
  //   const loadDynamicComponent = async () => {
  //     const Component = loadComponent(componentName);
  //     setDynamicComponent(() => Component);
  //   };
  //   loadDynamicComponent();
  // }, [componentName]);


  // const handleSavePluginConfiguration = async (data: any) => {
  //   console.log(data);

  //   await updateTenantPluginConfiguration(plugin.id, JSON.stringify(data))
  //     .then((pluginUpdated) => {
  //       console.log(pluginUpdated);

  //       if (pluginUpdated.id) {
  //         setPlugin(pluginUpdated);
  //         toast.success("configuraciones actualizadas");
  //       }
  //     })
  //     .catch(() => {
  //       toast.error("Ocurrió un error al actualizar el plugin");
  //     });
  // };

  // useEffect(() => {
  //   if (plugin.configuration) {
  //     const configs = JSON.parse(plugin.configuration);
  //     Object.keys(configs).map((key) => {
  //       setValue(key, configs[key]);
  //     });
  //   }
  // }, [plugin]);

  return (
    <div className="grid my-7 grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
      {/* <div className="px-4 sm:px-0">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          {plugin.plugin?.description}
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600"></p>
      </div>
      {plugin.plugin?.customComponent ? (
        <div className="w-full">
          {DynamicComponent ? (
            <DynamicComponent payload={plugin} />
          ) : (
            <div>Loading...</div>
          )}
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(handleSavePluginConfiguration)}
          className="bg-main shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
        >
          {plugin.plugin?.configurations?.map((config: any) => {
            return (
              <div key={config.id} className="px-4 py-6 sm:p-8">
                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-primary"
                    >
                      {config.name}
                    </label>
                    <div className="mt-2">
                      <div className="mt-2  ">
                        <div className="flex flex-col rounded-md shadow-sm ">
                          {config.valueType === "inputString" && (
                            <TextInput
                              value={watch(config.key)}
                              {...register(config.key, {
                                required: config.required ?? false,
                              })}
                            />
                          )}

                          {config.valueType === "selectCity" && <div></div>}
                        </div>
                      </div>
                      <p className="text-sm">{config.note}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="flex justify-end p-7">
            <Button type="submit">Guardar</Button>
          </div>
        </form>
      )} */}
    </div>
  );
};
