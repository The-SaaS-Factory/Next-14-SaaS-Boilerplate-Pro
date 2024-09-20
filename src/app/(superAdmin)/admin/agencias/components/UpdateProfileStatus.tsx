import { getTenantStatus } from "@/actions/global/tenantSystem/get-tenant-status";
import { updateTenantStatus } from "@/actions/global/tenantSystem/update-tenant-status";
import { useEffect, useState } from "react";

const statusOptions = ["ACTIVE", "INACTIVE", "PENDING"];

export const UpdateProfileStatus = ({ profileId }: { profileId: number }) => {
  const [status, setStatus] = useState<string>("");

  const handleChange = async (newStatus: string) => {
    if (newStatus !== status) {
      setStatus(newStatus);
      await updateTenantStatus({
        modelId: profileId,
        status: newStatus as any,
      });
    }
  };

  useEffect(() => {
    const fetchStatus = async () => {
      const currentStatus = await getTenantStatus(profileId);
      setStatus(currentStatus);
    };

    fetchStatus();
  }, [profileId]);

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
