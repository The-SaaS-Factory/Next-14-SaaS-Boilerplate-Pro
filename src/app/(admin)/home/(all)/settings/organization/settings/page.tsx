import { Metadata } from "next";
import { AgencySettingsForm } from "./components/AgencySettingsForm";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import { getProfileSettings } from "@/actions/admin/profileSettingsModule/get-profile-settings";

export const metadata: Metadata = {
  title: "Settings",
};
export default async function Page() {
  const settings = await getProfileSettings();

  console.log(settings);
  

  return (
    <>
      <AgencySettingsForm settings={settings} />
    </>
  );
}
