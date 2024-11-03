"use client";
import { closeSupportTicket } from "@/actions/global/supportModule/close-support-ticket";
import { Button } from "@/components/ui/button";
import { XMarkIcon } from "@heroicons/react/24/outline";

const CloseTicket = ({ ticketId }: { ticketId: number }) => {
  const handleCloseTicket = async () => {
    closeSupportTicket(ticketId);
  };

  return (
    <div>
      <Button onClick={handleCloseTicket}>
        <XMarkIcon className="w-5 h-5 text-red-500" />
        Close ticket
      </Button>
    </div>
  );
};

export default CloseTicket;
