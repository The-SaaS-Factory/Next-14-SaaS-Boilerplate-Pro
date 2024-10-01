import { IUserMembership } from "@/interfaces/saasTypes";
import prisma from "@/lib/db";

export const checkPermission = (
  userPermissions: string[],
  permissionName: string
) => {
  !userPermissions.includes(permissionName) &&
    !userPermissions.includes("superAdmin:totalAccess") &&
    returnUnauthorized();
};

export const hasPermission = (
  userPermissions: string[],
  permissionName: string
) => {
  return (
    userPermissions.includes(permissionName) ||
    userPermissions.includes("superAdmin:totalAccess")
  );
};

export const returnUnauthorized = () => {
  throw new Error("You don't have  permission to do this action");
};

export const getSuperAdminAdmins = async () => {
  const organizations = await prisma.organization.findMany({
    where: {
      permissions: {
        some: {
          name: "superAdmin:totalAccess",
        },
      },
    },
  });

  return organizations;
};

export const isOrganizationAdmin = (
  userMembership: IUserMembership
): boolean => {
  if (!userMembership) return false;

  const permissions = new Set(userMembership.permissions?.map((p) => p.name));
  return permissions.has("agency:admin") || userMembership.role == "ADMIN";
};

export const isSuperAdmin = (userMembership: IUserMembership): boolean => {
  const userPermissions = new Set(
    userMembership.permissions.map((p) => p.name)
  );

  return userPermissions.has("superAdmin:administration:read");
};
