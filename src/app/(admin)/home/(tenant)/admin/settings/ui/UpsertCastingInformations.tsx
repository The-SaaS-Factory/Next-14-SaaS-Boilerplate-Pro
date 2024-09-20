import NewForm from "@/components/core/NewForm";
import { CastingInformationType } from "@prisma/client";
import { upsertCastingInformation } from "@/actions/admin/castingModule/upsert-casting-information";

const UpsertCastingInformations = async ({
  modelId,
  values,
}: {
  modelId?: number;
  values?: any;
}) => {
  const formInfo = {
    name: " ",
    description: " ",
  };

  const fields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "type",
      label: "Tipo",
      type: "select",
      options: Object.keys(CastingInformationType).map((key) => ({
        optionName: key,
        optionValue: key,
      })),
      required: true,
    },
  ];

  return (
    <>
      <NewForm
        values={values ?? []}
        info={formInfo}
        fields={fields}
        modelToUpdate={modelId}
        onSubmit={upsertCastingInformation}
      />
    </>
  );
};

export default UpsertCastingInformations;
