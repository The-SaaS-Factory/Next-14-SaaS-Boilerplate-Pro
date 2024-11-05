import { Metadata } from "next";
import { AgencySettingsForm } from "./components/AgencySettingsForm";
import { getProfileSettings } from "@/actions/admin/profileSettingsModule/get-profile-settings";

export const metadata: Metadata = {
  title: "Settings",
};
export default async function Page() {
  const settings = await getProfileSettings();

  return (
    <>
      <AgencySettingsForm settings={settings} />
    </>
  );
}
