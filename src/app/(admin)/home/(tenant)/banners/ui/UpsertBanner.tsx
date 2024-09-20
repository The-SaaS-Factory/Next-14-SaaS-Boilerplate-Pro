import NewForm, { Field } from "@/components/core/NewForm";
import { upsertEcommerceBanner } from "@/actions/global/ecommerceSystem/bannerModule/upsert-banner";

const UpsertBanner = async ({
  modelId,
  values,
}: {
  modelId?: number;
  values?: any;
}) => {
  const formInfo = {
    name: "Administrar banner ",
    description: "Administra  los banners de la tienda",
  };

  const fields: Field[] = [
    {
      name: "name",
      label: "Nombre",
      type: "text",
      required: true,
    },
    {
      name: "image",
      label: "Imagen",
      type: "image",
      required: false,
    },
    {
      name: "link",
      label: "Link",
      type: "text",
      required: false,
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      required: true,
      options: [
        {
          optionName: "Active",
          optionValue: "ACTIVE",
        },
        {
          optionName: "Inactive",
          optionValue: "INACTIVE",
        },
      ],
    },
  ];

  return (
    <>
      <NewForm
        values={values ?? []}
        info={formInfo}
        fields={fields}
        modelToUpdate={modelId}
        customSaveButtonText="Publicar"
        onSubmit={upsertEcommerceBanner}
      />
    </>
  );
};

export default UpsertBanner;
