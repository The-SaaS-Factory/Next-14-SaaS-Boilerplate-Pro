"use client";
import { createSupportTickets } from "@/actions/global/supportModule/create-support-ticket";
import NewForm from "@/components/core/NewForm";
import { useSideOverState } from "@/states/ui/slideOverState";
import { SupportDepartmentType } from "@prisma/client";

import React from "react";

const NewTicketSupportForm = () => {
  const fields = [
    {
      name: "subject",
      label: "Subject",
      type: "text",
      required: true,
    },
    {
      name: "department",
      label: "Department",
      type: "select",
      required: true,
      options: [
        {
          optionName: "Billing",
          optionValue: SupportDepartmentType.BILLING,
        },
        {
          optionName: "Sales",
          optionValue: SupportDepartmentType.SALES,
        },
        {
          optionName: "Support",
          optionValue: SupportDepartmentType.SUPPORT,
        },
      ],
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      required: true,
    },
    {
      name: "images",
      label: "Images",
      type: "gallery",
      required: true,
    },
  ];
  const { toggleSideOver } = useSideOverState(
    ({ toggleSideOver, isSideOverOpen }) => ({
      toggleSideOver,
      isSideOverOpen,
    }),
  );

  const handleSendForm = async (data: any) => {
    toggleSideOver();
    return await createSupportTickets(data);
  };

  return (
    <>
      <NewForm
        fields={fields}
        onSubmit={handleSendForm}
        customSaveButtonText={"Send Ticket"}
      />
    </>
  );
};

export default NewTicketSupportForm;
