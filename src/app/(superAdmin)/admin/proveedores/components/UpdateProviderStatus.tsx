import { upsertProvider } from "@/actions/global/providersSystem/upsert-provider";
import { Provider, Status } from "@prisma/client";
import { useEffect, useState } from "react";

const statusOptions = ["ACTIVE", "INACTIVE"];

export const UpdateProviderStatus = ({ provider }: { provider: Provider }) => {
  const [status, setStatus] = useState<string>("");

  const handleChange = async (newStatus: string) => {
    setStatus(newStatus);
    await upsertProvider({
      modelId: provider.id,
      payload: {
        ...provider,
        status: newStatus as Status,
      },
    });
  };

  useEffect(() => {
    setStatus(provider.status);
  }, [provider]);

  return (
    <div className="flex gap-2">
      {statusOptions.map((option) => (
        <button
          type="button"
          key={option}
          onClick={() => handleChange(option)}
          className={`px-2 py-1 rounded-md border-2 transition-colors duration-300 text-xs ${
            option === status
              ? "bg-indigo-500 text-white border-indigo-600"
              : "bg-white text-gray-800 border-gray-300 hover:bg-gray-200"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};
