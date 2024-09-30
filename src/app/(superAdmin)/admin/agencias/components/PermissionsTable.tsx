import React, { useEffect, useState } from "react";
import { agencyPermissions } from "@/seed/seeds/permissions";
import { getPermissionsForProfile } from "@/actions/global/permissionsSystem/get-permissions-for-profile";
import { ToggleSwitch } from "@/components/ui/commons/ToggleSwitch";
import { setPermissionForProfile } from "@/actions/global/permissionsSystem/set-permission-for-profile";
import { removePermissionForProfile } from "@/actions/global/permissionsSystem/remove-permission-for-profile";

interface Props {
  organizationId: number;
}

export const PermissionsTable: React.FC<Props> = ({ organizationId }) => {
  const [permissions, setPermissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _permissions = await getPermissionsForProfile(organizationId);
        setPermissions(_permissions);
      } catch (error) {
        console.error("Failed to fetch permissions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [organizationId]);

  console.log(permissions);
  

  const handleToggle = async (permissionName: string) => {
    try {
      const hasPermission = permissions.some(
        (_permission) => _permission.name === permissionName
      );

      if (hasPermission) {
        await removePermissionForProfile(organizationId, permissionName);
        setPermissions(
          permissions.filter((item) => item.name !== permissionName)
        );
      } else {
        await setPermissionForProfile(organizationId, permissionName);
        const updatedPermissions = await getPermissionsForProfile(organizationId);
        setPermissions(updatedPermissions);
      }
    } catch (error) {
      console.error("Failed to update permission:", error);
    }
  };

  const isPermissionEnabled = (permissionName: string) =>
    permissions.some((_permission) => _permission.name === permissionName);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              {agencyPermissions.map((permission) => (
                <th className="text-xs text-gray-500 px-2" key={permission.name}>
                  {permission.description}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {agencyPermissions.map((permission) => (
                <td key={permission.name}>
                  <ToggleSwitch
                    onChange={() => handleToggle(permission.name)}
                    enabled={isPermissionEnabled(permission.name)}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};
