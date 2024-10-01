import { Permission } from "@prisma/client";

const usePermissionsBackend = ({
  permissions,
  permission,
}: {
  permissions: Permission[];
  permission: string;
}) => {
  let can = false;

  if (permissions.find((p) => p.name === permission)) {
    can = true;
  }

  return {
    can,
  };
};

export default usePermissionsBackend;
