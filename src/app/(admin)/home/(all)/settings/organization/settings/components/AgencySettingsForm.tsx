import { saveProfileSettings } from "@/actions/admin/profileSettingsModule/save-profile-settings";
import { updateProfileFields } from "@/actions/admin/userModule/update-profile-fields";
import { makeOrganizationOnboardingCompleted } from "@/actions/global/onboardingModule/make-organization-onboarding-completed";
import NewForm from "@/components/core/NewForm";
import { constants } from "@/lib/constants";
import { refreshOrganizationData } from "@/utils/facades/serverFacades/organizationFacade";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";

export const AgencySettingsForm = async ({
  settings,
}: {
  settings: any[]; //Fix This
}) => {
  const { organization } = await getMembership();
  const fieldsForSettings = [
    {
      name: "BILLING_LEGAL_NAME",
      label: "Billing  Legal Name",
      type: "text",
      required: false,
    },
    {
      name: "BILLING_ADDRESS",
      label: "Billing Address",
      type: "text",
      required: false,
    },
    {
      name: "BILLING_CITY",
      label: "Billing City",
      type: "text",
      required: false,
    },
    {
      name: "BILLING_STATE",
      label: "Billing State",
      type: "text",
      required: false,
    },
    {
      name: "BILLING_ZIP",
      label: "Billing Zip",
      type: "text",
      required: false,
    },
    {
      name: "BILLING_COUNTRY",
      label: "Billing Country",
      type: "text",
      required: false,
    },
    {
      name: "BILLING_PHONE",
      label: "Billing Phone",
      type: "text",
      required: false,
    },
    {
      name: "BILLING_EMAIL",
      label: "Billing Email",
      type: "text",
      required: false,
    },
  ];
  const fields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: false,
    },
  ];

  const formInfoSettings = {
    name: constants.tanantModelName + " settings",
    description: "",
  };

  const formInfo = {
    name: constants.tanantModelName + " information",
    description: "",
  };

  return (
    <>
      <NewForm
        info={formInfo}
        values={organization}
        fields={fields}
        callback={refreshOrganizationData}
        onSubmit={updateProfileFields}
        isSettingForm={true}
      />{" "}
      <NewForm
        info={formInfoSettings}
        values={settings}
        fields={fieldsForSettings}
        callback={makeOrganizationOnboardingCompleted}
        onSubmit={saveProfileSettings}
        isSettingForm={true}
      />{" "}
    </>
  );
};
