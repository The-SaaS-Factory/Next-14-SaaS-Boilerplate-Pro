import { updateProfileFields } from "@/actions/admin/userModule/update-profile-fields";
import { getProfileDetails } from "@/actions/global/profilesModule/get-profile-details";
import { updateOrganizationProfileFields } from "@/actions/global/profilesModule/update-organization-profile-fields";
import { updasetORganizationProfileSetting } from "@/actions/global/profilesModule/upsert-organization-profile-settings";
import NewForm from "@/components/core/NewForm";
import PageName from "@/components/ui/commons/PageName";
import { refreshOrganizationData } from "@/utils/facades/serverFacades/organizationFacade";

const ProfileEditPage = async ({
  params,
}: {
  params: {
    profileId: string;
  };
}) => {
  const profile = await getProfileDetails({
    profileId: parseInt(params.profileId),
  });

  const formInfo = {
    name: "Profile",
    description: " Configure your profile ",
  };

  const fields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: false,
    },
  ];

  const settingFormInfo = {
    name: "Profile Settings",
    description: " Configure your profile settings",
  };

  const fieldsForSettings = [
    {
      name: "SCREENSHOTS",
      label: "Screenshots",
      type: "gallery-cloudinary",
      required: false,
    },
  
  ];

  return (
    <>
      <PageName
        name="Edit Profile"
        breadcrumbs={[
          { name: "Dashboard", href: "/home/admin/" },
          { name: "Profiles", href: "/home/admin/profiles" },
          { name: "Edit profile", href: "#" },
        ]}
      />
      <NewForm
        info={formInfo}
        values={profile}
        fields={fields}
        modelToUpdate={profile.id}
        onSubmit={updateOrganizationProfileFields}
        isSettingForm={true}
      />{" "}
      <NewForm
        info={settingFormInfo}
        values={profile.settings}
        modelToUpdate={profile.id}
        fields={fieldsForSettings}
        onSubmit={updasetORganizationProfileSetting}
        isSettingForm={true}
      />{" "}
    </>
  );
};

export default ProfileEditPage;
