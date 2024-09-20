import { Metadata } from "next";
import { ManageAgencies } from "./ui/ManageAgencies";
import { getAllTenants } from "@/actions/global/tenantSystem/get-all-tenants";
import PageName from "@/components/ui/commons/PageName";

export const metadata: Metadata = {
  title: "Gestión de agencias",
};

const AgenciasPageAdmin = async () => {
  const agencies = await getAllTenants();
  return (
    <div>
      <PageName name={"Agencias"} />
      <ManageAgencies agencies={agencies} />
    </div>
  );
};

export default AgenciasPageAdmin;
