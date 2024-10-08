import { saveProfileSettings } from "@/actions/admin/profileSettingsModule/save-profile-settings";
import { updateProfileFields } from "@/actions/admin/userModule/update-profile-fields";
import { makeOrganizationOnboardingCompleted } from "@/actions/global/onboardingModule/make-organization-onboarding-completed";
import NewForm from "@/components/core/NewForm";
import { constants } from "@/lib/constants";
import { refreshOrganizationData } from "@/utils/facades/serverFacades/organizationFacade";

export const AgencySettingsForm = ({
  settings,
}: {
  settings: any[]; //Fix This
}) => {
  const fieldsForSettings = [
    {
      name: "BILLING_ADDRESS",
      label: "Billing Address",
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
        values={settings}
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
