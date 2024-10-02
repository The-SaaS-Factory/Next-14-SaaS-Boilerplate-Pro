"use client";
import { createSupportTickets } from "@/actions/global/supportModule/create-support-ticket";
import NewForm from "@/components/core/NewForm";
import { useSideOverState } from "@/states/ui/slideOverState";
import { SupportDepartamentType } from "@prisma/client";

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
      name: "departament",
      label: "Departamento",
      type: "select",
      required: true,
      options: [
        {
          optionName: "Billing",
          optionValue: SupportDepartamentType.BILLING,
        },
        {
          optionName: "Sales",
          optionValue: SupportDepartamentType.SALES,
        },
        {
          optionName: "Support",
          optionValue: SupportDepartamentType.SUPPORT,
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
    ({ toggleSideOver, isSideOverOpen }) => ({ toggleSideOver, isSideOverOpen })
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
