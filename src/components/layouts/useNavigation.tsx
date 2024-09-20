import { useMembership } from "@/app/hooks/useMembership";
import { constants } from "@/lib/constants";
import {
  CreditCardIcon,
  DocumentTextIcon,
  HomeIcon,
  BuildingLibraryIcon,
  TicketIcon,
  UsersIcon,
  ClipboardDocumentIcon,
  BookOpenIcon,
  HeartIcon,
  BoltIcon,
  FolderIcon,
  ClockIcon,
  TruckIcon,
  CheckBadgeIcon,
  XMarkIcon,
  BuildingStorefrontIcon,
  MegaphoneIcon,
  ListBulletIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/24/outline";

export const useNavigation = () => {
  const clientNavigation = [
    {
      sectionName: "Mis pedidos",
      icon: BuildingStorefrontIcon,
      href: "/home/orders/pendings",
      items: [
        {
          name: "Pedidos pendintes",
          href: "/home/orders/pendings",
          icon: ClockIcon,
          current: true,
        },
        {
          name: "Pedidos en proceso",
          href: "/home/orders/actives",
          icon: BoltIcon,
          current: true,
        },
        {
          name: "Pedidos en delivery",
          href: "/home/orders/delivery",
          icon: TruckIcon,
          current: true,
        },
        {
          name: "Pedidos completados",
          href: "/home/orders/completed",
          icon: CheckBadgeIcon,
          current: true,
        },
        {
          name: "Pedidos cancelados",
          href: "/home/orders/canceled",
          icon: XMarkIcon,
          current: true,
        },
      ],
    },
    {
      sectionName: "Mis contactos",
      icon: HomeIcon,
      href: "/home/contacts",
      items: [
        {
          name: " Mis contactos",
          href: "/home/contacts",
          icon: BookOpenIcon,
          current: true,
        },
        {
          name: " Adicionar contactos",
          href: "/home/contacts/add",
          icon: BookOpenIcon,
          current: true,
        },
      ],
    },
    {
      sectionName: "Mis favoritos",
      icon: HeartIcon,
      href: "/home/favorites",
      items: [
        {
          name: " Mis favoritos",
          href: "/home/favorites",
          icon: HeartIcon,
          current: true,
        },
      ],
    },
  ];

  const { profile } = useMembership();

  const tenantNavigation = [
    profile?.permissions?.includes("agency:admin") && {
      sectionName: "Mi agencia",
      icon: BuildingLibraryIcon,
      href: "/home/admin/configuraciones",
      items: [
        {
          name: "Configuraciones",
          href: "/home/admin/configuraciones",
          icon: HomeIcon,
          current: true,
        },
        {
          name: "Miembros",
          href: "/home/admin/members",
          icon: HomeIcon,
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

  return { tenantNavigation, clientNavigation, superAdminNavigation };
};
