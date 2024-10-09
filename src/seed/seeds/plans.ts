export const capabilities = [
  {
    name: "Support via email",
    description: "24/7 support via email",
    type: "PERMISSION",
  },
  {
    name: "Support via ticket",
    description: "24/7 support via tickets",
    type: "PERMISSION",
  },
  {
    name: "Members in the organization",
    description: "You can invite only 5 members in the organization",
    type: "LIMIT",
  },
];

export const plans = [
  {
    name: "Free Plan",
    description: "It's free, forever!",
  },
  {
    name: "Pro Plan",
    description: "Professional Plan",
  },
];

export const planCapabilities = [
  //Plan 1
  {
    planId: 1,
    capabilitieId: 1,
    count: 1,
    name: "",
  },
  //Plan 2
  {
    planId: 2,
    capabilitieId: 3,
    count: 1,
    name: "",
  },
  {
    planId: 2,
    capabilitieId: 2,
    count: 1,
    name: "",
  },
  {
    planId: 2,
    capabilitieId: 1,
    count: 5,
    name: "",
  },
];
