import {
  DocumentTextIcon,
  HomeIcon,
  BuildingLibraryIcon,
  UsersIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/24/outline";

export const useNavigation = () => {
  const tenantNavigation = [
    {
      sectionName: "General",
      icon: HomeIcon,
      href: "/home/admin/dashboard",
      items: [
        {
          name: "Dashboard",
          href: "/home/admin/dashboard",
          icon: HomeIcon,
          current: true,
        },
      ],
    },
    {
      sectionName: "Section Example",
      href: "/home/admin/section",
      icon: DocumentTextIcon,
      items: [
        {
          name: "Section Example Page 1",
          href: "/home/admin/section",
          icon: DocumentTextIcon,
          current: false,
        },
        {
          name: "Section Example Page 2",
          href: "/home/admin/section2",
          icon: BuildingLibraryIcon,
          current: false,
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
          name: "Dashboard",
          href: "/admin",
          icon: HomeIcon,
          current: true,
        },
        {
          name: "Tenants",
          href: "/admin/tenants",
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
          name: "Subscriptions",
          href: "/admin/billing/subscriptions",
          icon: BuildingLibraryIcon,
          current: false,
        },
      ],
    },
    {
      sectionName: "Activities",
      href: "/admin/activities/",
      icon: PresentationChartBarIcon,
      items: [
        {
          name: "Activities",
          href: "/admin/activities/",
          icon: PresentationChartBarIcon,
          current: false,
        },
      ],
    },
  ];

  return { tenantNavigation, superAdminNavigation };
};
