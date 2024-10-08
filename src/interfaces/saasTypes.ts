import {
  Coupon,
  Invoice,
  Log,
  OrganizationCapabilities,
  OrganizationPlugin,
  OrganizationSetting,
  OrganizationStatus,
  Permission,
  Plan,
  Referral,
  StripeCustomer,
  SupportTicket,
  SupportTicketMessage,
  User,
  UserMembershipRole,
  UserMembershipSetting,
} from "@prisma/client";

export interface ISubscription {
  id: number;
  organizationId: number;
  planId: number;
  plan: Plan;
  pricingId?: number;
  currencyId?: number;
  startDate: Date;
  endDateFreeTrial?: Date;
  endDate: Date;
  createdAt: Date;
}

export interface IOrganization {
  id: number;
  email?: string | null;
  name?: string | null;
  isMainTenant?: boolean;
  status: OrganizationStatus;
  address?: string | null;
  phone?: string | null;
  avatar?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  refer?: Referral[];
  referredBy?: Referral[];
  notification?: Notification[];
  subscription?: ISubscription;
  isOnboardingCompleted?: boolean;
  supportTicket?: SupportTicket[];
  supportTicketMessage?: SupportTicketMessage[];
  stripeCustomer?: StripeCustomer[];
  coupons?: Coupon[];
  invoices?: Invoice[];
  invoicesUser?: Invoice[];
  logs?: Log[];
  userMemberships?: IUserMembership[];
  organizationCapabilities?: OrganizationCapabilities[];
  settings?: OrganizationSetting[];
  organizationPlugin?: OrganizationPlugin[];
  permissions?: Permission[] | string[];
}

export interface IUserMembership {
  id: number;
  userId?: number;
  organizationId?: number;
  role: UserMembershipRole;
  permissions?: Permission[];
  isActive?: boolean;
  user?: User;
  organization?: IOrganization;
  settings: UserMembershipSetting[];
}

export interface IUser {
  id: number;
  name: string;
  email: string;
}
