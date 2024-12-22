"use client";
import { addMessageSupportTicket } from "@/actions/global/supportModule/add-message-support-ticket";
import NewForm from "@/components/core/NewForm";
import { ISupportTicket } from "@/interfaces/supportModule";
import { Card } from "@tremor/react";

const AddMessageToSupportTicket = ({ ticket }: { ticket: ISupportTicket }) => {
  const fields = [
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

  const handleCreateNewMessage = async (data: any) => {
    const { description, images } = data.payload;

    const newMessage = {
      description,
      images,
      ticketId: ticket.id,
    };

    await addMessageSupportTicket(newMessage);
  };

  return (
    <div>
      <Card className="mt-7 flex w-full">
        <div className="mx-auto flex w-full flex-col lg:w-1/2">
          <h2 className="text-subtitle">{"Add message"}</h2>
          <NewForm
            fields={fields}
            customSaveButtonText={"Send"}
            onSubmit={handleCreateNewMessage}
          />
        </div>
      </Card>
    </div>
  );
};

export default AddMessageToSupportTicket;
