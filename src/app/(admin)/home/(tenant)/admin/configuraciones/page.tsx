import PageName from "@/components/ui/commons/PageName";
import { Metadata } from "next";
import { AgencySettingsForm } from "./components/AgencySettingsForm";

export const metadata: Metadata = {
  title: "Configuración de la Agencia",
};
export default async function Page() {
  return (
    <>
      <PageName name="Configuración de la Agencia" />
      <AgencySettingsForm></AgencySettingsForm>
    </>
  );
}
