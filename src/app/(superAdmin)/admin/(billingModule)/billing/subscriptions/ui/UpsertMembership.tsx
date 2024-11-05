import NewForm from "@/components/core/NewForm";
import { upsertMembership } from "@/actions/superAdmin/superAdminBillingModule/upsert-membership";
import { getAllPlansPricings } from "@/actions/superAdmin/superAdminBillingModule/get-all-plan-pricing";

const UpsertMembership = async ({
  membershipId,
  values,
  currencies,
  plans,
}: {
  membershipId?: number;
  values?: any;
  currencies?: any;
  plans?: any;
}) => {
  const pricings = await getAllPlansPricings();
  console.log(values);

  const formInfo = {
    name: "Manage membership",
    description: "Manage a tenant's membership manually",
  };

  const fields = [
    {
      name: "organizationId",
      label: "Organization Id",
      type: "number",
      required: true,
    },
    {
      name: "planId",
      label: "Plan",
      type: "searchselect",
      required: true,
      forceInteger: true,
      options: plans?.map((plan: any) => ({
        optionName: plan.name,
        optionValue: plan.id.toString(),
      })),
    },
    {
      name: "pricingId",
      label: "Price Id",
      type: "searchselect",
      forceInteger: true,
      options: pricings?.map((pricing: any) => ({
        optionName: `${pricing.frequency} - ${pricing.price} / ${pricing.Plan.name}`,
        optionValue: pricing.id.toString(),
      })),
      required: true,
    },
    {
      name: "startDate",
      label: "Start Date",
      type: "date",
      required: true,
    },
    {
      name: "endDate",
      label: "End Date",
      type: "date",
      required: true,
    },
    {
      name: "endDateFreeTrial",
      label: "End free trial Date",
      type: "date",
      required: false,
    },
    {
      name: "currencyId",
      label: "Currency",
      type: "searchselect",
      required: true,
      forceInteger: true,
      options: currencies?.map((currency: any) => ({
        optionName: currency.name,
        optionValue: currency.id,
      })),
    },
  ];

  return (
    <>
      <NewForm
        values={values ?? []}
        info={formInfo}
        fields={fields}
        modelToUpdate={membershipId}
        onSubmit={upsertMembership}
      />
    </>
  );
};

export default UpsertMembership;
