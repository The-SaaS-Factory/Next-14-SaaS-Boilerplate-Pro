import { getProfileSettings } from "@/actions/admin/profileSettingsModule/get-profile-settings";
import { saveProfileSettings } from "@/actions/admin/profileSettingsModule/save-profile-settings";
import { makeOrganizationOnboardingCompleted } from "@/actions/global/onboardingModule/make-organization-onboarding-completed";
import NewForm from "@/components/core/NewForm";
import { IOrganization } from "@/interfaces/saasTypes";
import { constants } from "@/lib/constants";

export const AgencySettingsForm = ({
  settings,
}: {
  settings: any[]; //Fix This
}) => {
  const fields = [
    {
      name: "ORGANIZATION_LOGO",
      label: constants.tanantModelName + " logo",
      type: "image",
      required: false,
    },
  ];

  const formInfo = {
    name: "General Information",
    description: "",
  };

  return (
    <>
      <NewForm
        info={formInfo}
        values={settings}
        fields={fields}
        callback={makeOrganizationOnboardingCompleted}
        onSubmit={saveProfileSettings}
        customSaveButtonText={"Complete onboarding"}
        isSettingForm={true}
      />
    </>
  );
};
