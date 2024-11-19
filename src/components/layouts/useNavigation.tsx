import {
  DocumentTextIcon,
  HomeIcon,
  BuildingLibraryIcon,
  UsersIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/24/outline";
import { BoxIcon, Calendar, Factory, ShoppingBag } from "lucide-react";

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
      sectionName: "My Projects",
      icon: Factory,
      href: "/home/admin/factory/dashboard",
      items: [
        {
          name: "Dashboard",
          href: "/home/admin/factory/dashboard",
          icon: HomeIcon,
          current: true,
        },
      ],
    },
    // {
    //   sectionName: "Community",
    //   icon: UsersIcon,
    //   href: "/marketplace",
    //   items: [
    //     {
    //       name: "Marketplace",
    //       href: "/marketplace",
    //       icon: HomeIcon,
    //       current: true,
    //     },
    //     {
    //       name: "Directory",
    //       href: "/directory",
    //       icon: HomeIcon,
    //       current: true,
    //     },
    //   ],
    // },
    {
      sectionName: "Resources",
      icon: BoxIcon,
      href: "/home/admin/boilerplates",
      items: [
        {
          name: "Boilerplates",
          href: "/home/admin/boilerplates",
          icon: HomeIcon,
          current: true,
        },
        {
          name: "Services",
          href: "/home/admin/services",
          icon: HomeIcon,
          current: true,
        },
        // {
        //   name: "Curses",
        //   href: "/home/admin/curses",
        //   icon: HomeIcon,
        //   current: true,
        // },
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
        {
          name: "Coupons",
          href: "/admin/billing/coupons",
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
