import NewForm from "@/components/core/NewForm";
import { upsertCurrency } from "@/actions/superAdmin/superAdminBillingModule/upsert-currencies";
 
const UpsertCurrency = ({
  planId,
  values,
}: {
  planId?: number;
  values?: any;
}) => {
  const formInfo = {
    name: "Manage Currency",
    description: " Manage Currency",
  };

  const fields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "rate",
      label: "Rate",
      type: "number",
      required: true,
      note: "Rate in USD",
    },
    {
      name: "code",
      label: "Identificador",
      type: "text",
      required: true,
    },
    // {
    //   name: "main",
    //   label: "Administrar cuenta",
    //   type: "select",
    //   required: true,
    //   options: [
    //     {
    //       optionName: "Yes",
    //       optionValue: "1",
    //     },
    //     {
    //       optionName: "No",
    //       optionValue: "0",
    //     },
    //   ],
    // },
  ];

  return (
    <>
      
      <NewForm
        values={values ?? []}
        info={formInfo}
        fields={fields}
        modelToUpdate={planId}
        onSubmit={upsertCurrency}
      />
    </>
  );
};

export default UpsertCurrency;
