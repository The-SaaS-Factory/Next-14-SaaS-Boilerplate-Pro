import { getAllCastingCategories } from "@/actions/admin/castingModule/get-all-casting-categories";
import NewForm from "@/components/core/NewForm";
import { CastingFormat, CastingStatus } from "@prisma/client";
import { upsertCasting } from "@/actions/admin/castingModule/upsert-casting";
import { getUserCastingRoles } from "@/actions/admin/castingModule/get-user-casting-roles";
import { getAllCastingInformations } from "@/actions/admin/castingModule/get-all-casting-informations";

const UpsertCasting = async ({
  modelId,
  values,
}: {
  modelId?: number;
  values?: any;
}) => {
  const categories = await getAllCastingCategories();
  const roles = await getUserCastingRoles();
  const informations = await getAllCastingInformations();

  const formInfo = {
    name: "Administra castings",
    description: "Administra tus castings",
  };

  const fields = [
    {
      name: "name",
      label: "Nombre",
      type: "text",
      required: true,
    },
    {
      name: "resume",
      label: "Resumen del casting",
      type: "textarea",
      required: true,
      note: "Presenta tu casting en pocas palabras para que los modelos sepan de qué se trata.",
    },
    {
      name: "description",
      label: "Detalles del casting",
      type: "textarea",
      required: false,
    },
    {
      name: "categories",
      label: "Categorías",
      type: "multiselect",
      options: categories?.map((category) => ({
        optionName: category.name,
        optionValue: category.id,
      })),
      required: true,
    },
    {
      name: "roles",
      label: "Roles",
      type: "multiselect",
      options: roles?.map((role) => ({
        optionName: role.name,
        optionValue: role.id,
      })),
      required: true,
    },
    {
      name: "informations",
      label: "Datos requeridos para aplicar al casting",
      type: "multiselect",
      options: informations?.map((information) => ({
        optionName: information.name,
        optionValue: information.id,
      })),
      required: true,
    },
    {
      name: "ubication",
      label: "Ubicación",
      type: "text",
      required: true,
    },
    {
      name: "dateEvent",
      label: "Fecha del casting",
      type: "date",
      required: true,
    },
    {
      name: "dateLimitApplicants",
      label: "Fecha límite de aplicaciones",
      type: "date",
      required: true,
    },
    {
      name: "referenceImages",
      label: "Referencias de casting",
      type: "gallery",
      required: true,
    },
    {
      name: "paymentMethod",
      label: "Método de pago",
      type: "text",
      required: true,
    },
    {
      name: "status",
      label: "Estado",
      type: "select",
      options: Object.keys(CastingStatus).map((status) => ({
        optionName: status,
        optionValue: status,
      })),
      required: true,
    },
    {
      name: "format",
      label: "Formato del casting",
      type: "select",
      options: Object.keys(CastingFormat).map((status) => ({
        optionName: status === CastingFormat.PAID ? "Pagado" : "No pagado",
        optionValue: status,
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
        onSubmit={upsertCasting}
      />
    </>
  );
};

export default UpsertCasting;
