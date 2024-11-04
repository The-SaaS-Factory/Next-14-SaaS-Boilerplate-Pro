import { frequencyType } from "@prisma/client";

export const capabilities = [
  {
    id:1,
    name: "Support via email",
    description: "24/7 support via email",
    type: "PERMISSION",
  },
  {
    id:2,
    name: "Support via ticket",
    description: "24/7 support via tickets",
    type: "PERMISSION",
  },
  {
    id:3,
    name: "Members in the organization",
    description: "You can invite only 5 members in the organization",
    type: "LIMIT",
  },
];

export const plans = [
  {
    id: 1,
    name: "Basic Plan",
    description: "Basic plan",
  },
  {
    id: 2,
    name: "Pro Plan",
    description: "Professional Plan",
  },
];

export const pricing = [
  {
    frequency: frequencyType.MONTHLY,
    price: 10,
    status: "ACTIVE",
    planId: 1,
  },
  {
    frequency: frequencyType.YEARLY,
    price: 100,
    status: "ACTIVE",
    planId: 1,
  },
  {
    frequency: frequencyType.MONTHLY,
    price: 20,
    status: "ACTIVE",
    planId: 2,
  },
  {
    frequency: frequencyType.YEARLY,
    price: 200,
    status: "ACTIVE",
    planId: 2,
  },
];

export const planCapabilities = [
  //Plan 1
  {
    planId: 1,
    capabilityId: 1,
    count: 1,
    name: "",
  },
  {
    planId: 1,
    capabilityId: 2,
    count: 1,
    name: "",
  },
  //Plan 2
  {
    planId: 2,
    capabilityId: 3,
    count: 1,
    name: "",
  },
  {
    planId: 2,
    capabilityId: 2,
    count: 1,
    name: "",
  },
  {
    planId: 2,
    capabilityId: 1,
    count: 5,
    name: "",
  },
];
