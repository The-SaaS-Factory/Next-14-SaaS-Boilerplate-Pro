"use client";
import { TrashIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";

const DeleteModel = ({
  modelId,
  primaryModelId,
  deleteAction,
  callbackAction,
}: {
  modelId: number;
  primaryModelId?: number;
  // eslint-disable-next-line no-unused-vars
  deleteAction: (modelId: number, primaryModelId?: number | undefined) => void;
  callbackAction?;
}) => {
  const handleDeleteModel = () => {
    toast("You're sure?", {
      action: {
        label: "Delete",
        onClick: () => {
          if (primaryModelId) {
            deleteAction(primaryModelId, modelId);
            toast.success("Successfully removed");
          } else {
            deleteAction(modelId);
          }
          callbackAction && callbackAction();
        },
      },
    });
  };

  return (
    <div>
      <button
        className="flex items-center space-x-1"
        onClick={handleDeleteModel}
      >
        <TrashIcon className="h-6 w-6" />
        <span>Delete</span>
      </button>
    </div>
  );
};

export default DeleteModel;
