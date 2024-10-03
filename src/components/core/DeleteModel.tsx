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
        className="flex space-x-1 items-center "
        onClick={handleDeleteModel}
      >
        <TrashIcon className="w-6 h-6" />
        <span>Delete</span>
      </button>
    </div>
  );
};

export default DeleteModel;
