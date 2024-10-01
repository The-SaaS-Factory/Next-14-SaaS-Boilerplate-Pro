import { constants } from "@/lib/constants";
import {
  CreditCardIcon,
  DocumentTextIcon,
  HomeIcon,
  BuildingLibraryIcon,
  TicketIcon,
  UsersIcon,
  ClipboardDocumentIcon,
  FolderIcon,
  MegaphoneIcon,
  ListBulletIcon,
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
    {
      sectionName: "Castings",
      href: "/home/admin/castings/all",
      icon: MegaphoneIcon,
      items: [
        {
          name: "Todos mis castings",
          href: "/home/admin/castings/all",
          icon: ListBulletIcon,
          current: true,
        },
        {
          name: "Nuevo casting",
          href: "/home/admin/castings/add",
          icon: FolderIcon,
          current: true,
        },
        {
          name: "Roles",
          href: "/home/admin/settings/roles",
          icon: ClipboardDocumentIcon,
          current: true,
        },
        {
          name: "Informaciones",
          href: "/home/admin/settings/informations",
          icon: ClipboardDocumentIcon,
          current: true,
        },
      ].filter(Boolean),
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
      sectionName: "Financiero",
      href: "/admin/billing/invoices",
      icon: DocumentTextIcon,
      items: [
        {
          name: "Facturas",
          href: "/admin/billing/facturas",
          icon: DocumentTextIcon,
          current: false,
        },
        {
          name: "Reportes",
          href: "/admin/billing/reportes",
          icon: TicketIcon,
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

  if (constants.multiTenant) {
    superAdminNavigation.push({
      sectionName: "Facturación",
      icon: CreditCardIcon,
      href: "/admin/billing/plans/plans",
      items: [
        {
          name: "Planes",
          href: "/admin/billing/plans/plans",
          icon: CreditCardIcon,
          current: true,
        },
        {
          name: "Subscripciones",
          href: "/admin/billing/subscriptions",
          icon: BuildingLibraryIcon,
          current: false,
        },
      ],
    });
  }

  return { tenantNavigation, superAdminNavigation };
};
