export const isTenantAdmin = (membershipPermissions) => {
  const result = membershipPermissions.some(
    (permission) => permission.name === "agency:admin",
  );
  console.log(result);

  return result;
};

export const tenantModuleScope = "superAdmin:tenant-admin";
