import { constants } from "@/lib/constants";
import {
  DocumentTextIcon,
  HomeIcon,
  BuildingLibraryIcon,
  UsersIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/24/outline";

export const useNavigation = (isOrganizationAdmin?: boolean) => {
  const tenantNavigation = [
    isOrganizationAdmin && {
      sectionName: `My ${constants.tanantModelName}`,
      icon: BuildingLibraryIcon,
      href: "/home/admin/settings",
      items: [
        {
          name: "Settings",
          href: "/home/admin/settings",
          current: true,
        },
        {
          name: "Members",
          href: "/home/admin/members",
          current: true,
        },
      ],
    },
    {
      sectionName: "General",
      icon: HomeIcon,
      href: "/home/admin/dashboard",
      items: [
        {
          name: "Escritorio",
          href: "/home/admin/dashboard",
          icon: HomeIcon,
          current: true,
        },
      ],
    },
  ].filter(Boolean);

  const superAdminNavigation = [
    {
      sectionName: "General",
      icon: HomeIcon,
      href: "/admin",
      items: [
        {
          name: "Escritorio",
          href: "/admin",
          icon: HomeIcon,
          current: true,
        },
        {
          name: "Agencias",
          href: "/admin/agencias",
          icon: UsersIcon,
          current: false,
        },
      ],
    },
    {
      sectionName: "Billing",
      href: "/admin/billing/plans/plans",
      icon: DocumentTextIcon,
      items: [
        {
          name: "Plans",
          href: "/admin/billing/plans/plans",
          icon: DocumentTextIcon,
          current: false,
        },
        {
          name: "Subscripciones",
          href: "/admin/billing/subscriptions",
          icon: BuildingLibraryIcon,
          current: false,
        },
      ],
    },
    {
      sectionName: "Actividades",
      href: "/admin/activities/",
      icon: PresentationChartBarIcon,
      items: [
        {
          name: "Facturas",
          href: "/admin/activities/",
          icon: PresentationChartBarIcon,
          current: false,
        },
      ],
    },
  ];

  return { tenantNavigation, superAdminNavigation };
};
