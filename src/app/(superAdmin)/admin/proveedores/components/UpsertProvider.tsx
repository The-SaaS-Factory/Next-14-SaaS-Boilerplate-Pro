"use client";

import { upsertProvider } from "@/actions/global/providersSystem/upsert-provider";
import NewForm, { Field } from "@/components/core/NewForm";
import { ProviderCategory } from "@prisma/client";

const UpsertProvider = ({
  modelId,
  values,
  callback,
}: {
  modelId?: number;
  values?: any;
  callback?: () => void;
}) => {
  const fields: Field[] = [
    {
      name: "name",
      label: "Nombre del proveedor",
      type: "text",
      hasLanguageSupport: false,
      required: true,
    },
    {
      name: "description",
      label: "Descripción del proveedor",
      type: "textarea",
      hasLanguageSupport: false,
      required: false,
    },
    {
      name: "category",
      label: "Categoría",
      type: "select",
      options: Object.keys(ProviderCategory).map((key) => ({
        optionName: key,
        optionValue: key,
      })),
      required: true,
    },
    {
      name: "status",
      label: "Estado",
      type: "select",
      options: [
        {
          optionName: "Activo",
          optionValue: "ACTIVE",
        },
        {
          optionName: "Inactivo",
          optionValue: "INACTIVE",
        },
      ],
      required: true,
    },
  ];

  return (
    <>
      <div className="flex flex-col justify-between h-full z-50 space-y-3 text-primary pt-8">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between">
            <h2 className="text-title">
              {" "}
              {modelId ? "Editar" : "Nuevo"} Proveedor
            </h2>
            {callback && (
              <button onClick={callback} className="btn-main" type="button">
                Volver
              </button>
            )}
          </div>

          <hr />
          <NewForm
            values={values ?? []}
            info={null}
            fields={fields}
            modelToUpdate={modelId}
            onSubmit={upsertProvider}
          />
        </div>
      </div>
    </>
  );
};

export default UpsertProvider;
