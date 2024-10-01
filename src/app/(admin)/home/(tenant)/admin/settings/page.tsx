import PageName from "@/components/ui/commons/PageName";
import { Metadata } from "next";
import { AgencySettingsForm } from "./components/AgencySettingsForm";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import { getProfileSettings } from "@/actions/admin/profileSettingsModule/get-profile-settings";

export const metadata: Metadata = {
  title: "Settings",
};
export default async function Page() {
  const { organization } = await getMembership();
  const settings = await getProfileSettings(organization.id);

  return (
    <>
      <PageName name="Settings" />
      <AgencySettingsForm settings={settings} />
    </>
  );
}
