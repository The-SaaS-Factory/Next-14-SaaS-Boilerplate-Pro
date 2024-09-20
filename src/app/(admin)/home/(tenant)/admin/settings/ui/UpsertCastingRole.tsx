import NewForm from "@/components/core/NewForm";
import { upsertCastingRole } from "@/actions/admin/castingModule/upsert-casting-role";

const UpsertCastingRole = async ({
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
  ];

  return (
    <>
      <NewForm
        values={values ?? []}
        info={formInfo}
        fields={fields}
        modelToUpdate={modelId}
        onSubmit={upsertCastingRole}
      />
    </>
  );
};

export default UpsertCastingRole;
