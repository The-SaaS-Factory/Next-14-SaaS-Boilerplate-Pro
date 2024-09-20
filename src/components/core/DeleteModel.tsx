/* eslint-disable no-unused-vars */
"use client";
import { TrashIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";

const DeleteModel = ({
  modelId,
  primaryModelId,
  deleteAction,
}: {
  modelId: number;
  primaryModelId?: number;
  deleteAction: (modelId: number, primaryModelId?: number | undefined) => void;
}) => {
  const handleDeleteModel = () => {
    toast("Estás seguro?", {
      action: {
        label: "Eliminar",
        onClick: () => {
          if (primaryModelId) {
            deleteAction(primaryModelId, modelId);
            toast.success("Eliminado correctamente");
          } else {
            deleteAction(modelId);
          }
        },
      },
    });
  };

  return (
    <div>
      <button className="flex space-x-1 items-center " onClick={handleDeleteModel}>
        <TrashIcon className="w-6 h-6" />
        <span>Eliminar</span>
      </button>
    </div>
  );
};

export default DeleteModel;
