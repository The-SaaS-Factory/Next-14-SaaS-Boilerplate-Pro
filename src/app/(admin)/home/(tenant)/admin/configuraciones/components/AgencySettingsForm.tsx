import { getProfileSettings } from "@/actions/admin/profileSettingsModule/get-profile-settings";
import { saveProfileSettings } from "@/actions/admin/profileSettingsModule/save-profile-settings";
import NewForm from "@/components/core/NewForm";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";

export const AgencySettingsForm = async () => {
  const fields = [
    {
      name: "AGENCY_NAME",
      label: "Nombre de la Agencia",
      type: "text",
      required: true,
    },

    {
      name: "AGENCY_TAXID",
      label: "Número de Identificacón Fiscal",
      type: "textarea",
      required: true,
    },

    {
      name: "AGENCY_LOGO",
      label: "Logo de la Agencia",
      type: "image",
      required: false,
    },
  ];
  const contactFields = [
    {
      name: "AGENCY_CONTACT_NAME",
      label: "Nombre del Contacto Principal",
      type: "text",
      required: true,
    },

    {
      name: "AGENCY_CONTACT_SURNAME",
      label: "Apellidos del Contacto Principal",
      type: "text",
      required: true,
    },

    {
      name: "AGENCY_CONTACT_PHONE",
      label: "Teléfono del Contacto Principal",
      type: "text",
      required: true,
    },

    {
      name: "AGENCY_CONTACT_MAIL",
      label: "Correo Electrónico Principal",
      type: "text",
      required: true,
    },
  ];

  const formInfo = {
    name: "Información Principal de la Agencia",
    description: "",
  };
  const contactFormInfo = {
    name: "Contacto Principal de la Agencia",
    description: "",
  };

  const { organization } = await getMembership();
  const settings = await getProfileSettings(organization.id);

  return (
    <>
      <NewForm
        info={formInfo}
        values={settings}
        fields={fields}
        onSubmit={saveProfileSettings}
        customSaveButtonText={"Guardar"}
        isSettingForm={true}
      />

      <NewForm
        info={contactFormInfo}
        values={settings}
        fields={contactFields}
        onSubmit={saveProfileSettings}
        customSaveButtonText={"Guardar"}
        isSettingForm={true}
      />
    </>
  );
};
