"use client";

import { getShopSettings } from "@/actions/global/ecommerceSystem/shopModule/get-shop-settings";
import { upsertShopSettings } from "@/actions/global/ecommerceSystem/shopModule/upsert-shop-settings";
import { TextInput } from "@tremor/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const AdminSettingsModuleProfilePage = () => {
  const [settings, setSettings] = useState<any>(null);
    console.log(settings);
    
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getShopSettings();
        setSettings(data);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    fetchSettings();
  }, []);

  useEffect(() => {
    if (settings) {
      setValue(
        "tax",
        settings.find(
          (setting) => setting.settingName === "ECOMMERCE_TAX_PORCENT"
        )?.settingValue
      );
    }
  }, [settings]);

  const { register, handleSubmit, setValue } = useForm();

  const handleUpdateTaxSetting = async (data) => {
    try {
      await upsertShopSettings({
        payload: {
          name: "ECOMMERCE_TAX_PORCENT",
          value: data.tax,
        },
      });

      toast.success("Impuestos actualizados correctamente");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleUpdateWeightSetting = async (data) => {
    try {
      await upsertShopSettings({
        payload: {
          name: "ECOMMERCE_MIN_WEIGHT",
          value: data.weight,
        },
      });

      toast.success("Peso actualizado correctamente");
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <div>
      <div className="mt-1">
        <div className="divide-y divide-white/5">
          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text">
                Configuración de impuestos
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                Aquí puedes configurar los impuestos de tu tienda
              </p>
            </div>

            <form
              onSubmit={handleSubmit(handleUpdateTaxSetting)}
              className="md:col-span-2"
            >
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="current-password"
                    className="block text-sm font-medium leading-6 text"
                  >
                   % de Impuestos en el Checkout
                  </label>
                  <div className="mt-2">
                    <TextInput
                      placeholder=""
                      id={"current-passwor"}
                      {...register("tax", {
                        required: true,
                      })}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex">
                <button type="submit" className="btn-main">
                  Cambiar
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="divide-y divide-white/5">
          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text">
                Configuración de pedidos
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                Aquí puedes configurar  los pedidos de tu tienda
              </p>
            </div>

            <form
              onSubmit={handleSubmit(handleUpdateWeightSetting)}
              className="md:col-span-2"
            >
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="current-password"
                    className="block text-sm font-medium leading-6 text"
                  >
                   Libras mínimas para aceptar un pedido
                  </label>
                  <div className="mt-2">
                    <TextInput
                      placeholder=""
                      id={"current-passwor"}
                      {...register("weight", {
                        required: true,
                      })}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex">
                <button type="submit" className="btn-main">
                  Cambiar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsModuleProfilePage;
