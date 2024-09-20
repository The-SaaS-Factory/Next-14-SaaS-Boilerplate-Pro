"use client";

import { upsertProviderSettings } from "@/actions/global/providersSystem/update-provider-setting";
import { getProvincias } from "@/actions/utils/provinces";
import { MultiSelect, MultiSelectItem, TextInput } from "@tremor/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const fields = [
  {
    name: "province",
    label: "Provincias",
    type: "multiselect",
    options: getProvincias().map((key) => ({
      optionValue: key.id,
      optionName: key.provincia,
    })),
    required: true,
  },
  {
    name: "priceCUP",
    label: "Precio CUP",
    type: "text",

    required: true,
  },
  {
    name: "priceMLC",
    label: "Precio MLC",
    type: "text",

    required: true,
  },
  {
    name: "priceUSD",
    label: "Precio USD Cash",
    type: "text",

    required: true,
  },
  {
    name: "feeCUP",
    label: "Proveedor Comisión CUP",
    type: "text",

    required: true,
  },
  {
    name: "feeMLC",
    label: "Proveedor Comisión MLC",
    type: "text",

    required: true,
  },
  {
    name: "feeUSD",
    label: "Proveedor Comisión USD Cash",
    type: "text",
    required: true,
  },
  {
    name: "superAdminfee-CUP",
    label: "Mi Comisión CUP",
    type: "text",

    required: true,
  },
  {
    name: "superAdminfee-MLC",
    label: "Mi Comisión MLC",
    type: "text",

    required: true,
  },
  {
    name: "superAdminfee-USD",
    label: "Mi Comisión USD Cash",
    type: "text",
    required: true,
  },
];

export const UpdateOptionRemittenceProvider = ({
  providerId,
  valuesDefaults,
}: {
  providerId: number;
  valuesDefaults: any;
}) => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleUpdateRemittenceProviderSettings = async (data: any) => {
    const payload = fields.map((field) => ({
      settingName: field.name,
      settingValue: data[field.name],
    }));

    await upsertProviderSettings({
      modelId: providerId,
      payload,
    })
      .then(() => {
        toast.success("Configuración actualizada correctamente");
      })
      .catch(() => {
        toast.error("Error al actualizar la configuración");
      });
  };

  useEffect(() => {
    //Fill the form with the default values
    fields.map((field) => {
      const value = valuesDefaults.find(
        (value: any) => value.settingName === field.name
      )?.settingValue;

      if (field.name === "province" && value !== undefined) {
        setValue(field.name, JSON.parse(value));
      } else {
        setValue(field.name, value);
      }
    });
    // console.log(valuesDefaults);
  }, [valuesDefaults]);

  return (
    <>
      <div className="lg:col-span-2 grid grid-cols-1 gap-x-4  w-full  text-secundary">
        <form onSubmit={handleSubmit(handleUpdateRemittenceProviderSettings)}>
          {fields.map((field, index) => (
            <>
              {field.type === "text" && (
                <div
                  key={`field-${index}`}
                  className="my-3 flex max-w-md items-center justify-between "
                >
                  <label
                    htmlFor="name"
                    className="text-sm min-w-48 flex-1 font-semibold text-primary"
                  >
                    {field.label}
                  </label>
                  <TextInput
                    className="flex-0"
                    value={watch(field.name)}
                    {...register(field.name, {
                      required: field.required,
                    })}
                    error={errors[`${field.name}`] && true}
                  />
                </div>
              )}

              {field.type === "multiselect" && (
                <>
                  <MultiSelect
                    onValueChange={(value) => setValue(field.name, value)}
                    id={field.name}
                    value={watch(field.name)}
                  >
                    {field.options?.map((option, index: number) => {
                      return (
                        <MultiSelectItem
                          value={option.optionValue?.toString() ?? ""}
                          key={`option-${index}`}
                        >
                          {option.optionName}
                        </MultiSelectItem>
                      );
                    })}
                  </MultiSelect>
                </>
              )}
            </>
          ))}

          <div className="flex justify-end">
            <button type="submit" className="btn-main">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
