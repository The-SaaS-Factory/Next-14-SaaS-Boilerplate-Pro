import NewForm from "@/components/core/NewForm";
import { CouponDuration } from "@prisma/client";
import { upsertCoupon } from "@/actions/superAdmin/superAdminBillingModule/coupons/upsert-coupon";
import { getAllUser } from "@/actions/superAdmin/superAdminUsersModule/get-all-user";

const UpsertCoupon = async ({
  modelId,
  values,
}: {
  modelId?: number;
  values?: any;
}) => {
  const users = await getAllUser({ args: { limit: 5000 } });

  const formInfo = {
    name: "Manage Coupon",
    description: "Create or update a coupon",
  };

  const fields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "amountOff",
      label: "Amount off",
      type: "number",
      required: false,
    },
    {
      name: "percentOff",
      label: "% off",
      type: "number",
      required: false,
    },
    {
      name: "durationInMonths",
      label: "Duration in months",
      type: "number",
      required: false,
    },
    {
      name: "maxRedemptions",
      label: "Max redemptions",
      type: "number",
      required: false,
    },
    {
      name: "userId",
      label: "User owner",
      type: "searchselect",
      required: false,
      forceInteger: true,
      options:
        users.data.length > 0
          ? users.data?.map((user) => ({
              optionValue: user.id as number,
              optionName: user.name + " - " + user.id,
            }))
          : [],
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      required: false,
      options: [
        {
          optionValue: "INACTIVE",
          optionName: "Inactive",
        },
        {
          optionValue: "ACTIVE",
          optionName: "Active",
        },
      ],
    },
    {
      name: "duration",
      label: "Duration",
      type: "select",
      required: true,
      options: Object.keys(CouponDuration).map((key) => ({
        optionValue: key,
        optionName: key,
      })),
    },
  ];

  return (
    <>
      <NewForm
        values={values ?? []}
        info={formInfo}
        fields={fields}
        modelToUpdate={modelId}
        onSubmit={upsertCoupon}
      />
    </>
  );
};

export default UpsertCoupon;
