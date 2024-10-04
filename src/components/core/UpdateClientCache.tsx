"use client";

import { IOrganization, IUserMembership } from "@/interfaces/saasTypes";

export const UpdateClientCache = ({
  organization,
  userMembership,
}: {
  organization: IOrganization;
  userMembership: IUserMembership;
}) => {
  localStorage.setItem("organization", JSON.stringify(organization));
  localStorage.setItem("userMembership", JSON.stringify(userMembership));

  return null;
};
