import { Metadata } from "next";
import PageName from "@/components/ui/commons/PageName";
import { ManageProviders } from "./components/ManageProviders";
import { getAllProviders } from "@/actions/global/providersSystem/get-all-providers";

import UpsertProvider from "./components/UpsertProvider";
import { CustomDialog } from "@/components/ui/componenets/Dialog";
import { PlusIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Gestión de proveedores",
};

const AgenciasPageAdmin = async () => {
  const providers = await getAllProviders();

  return (
    <div>
      <PageName name={"Proveedores"}>
        <CustomDialog
          icon={<PlusIcon className="size-6"></PlusIcon>}
          label="Agregar proveedor"
          style="button"
        >
          <>
            <UpsertProvider values={[]} />
          </>
        </CustomDialog>
      </PageName>
      <ManageProviders providers={providers} />
    </div>
  );
};

export default AgenciasPageAdmin;
