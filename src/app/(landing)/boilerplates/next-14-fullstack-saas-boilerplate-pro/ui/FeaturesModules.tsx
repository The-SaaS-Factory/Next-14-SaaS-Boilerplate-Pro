"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building2,
  CreditCard,
  Users,
  Layers,
  Home,
  Moon,
  LayoutDashboard,
  Bell,
  SwitchCamera,
  UserCircle,
  TicketCheck,
  Settings,
  Megaphone,
  Receipt,
  Image,
  FormInput,
  UserCog,
  Building,
  Zap,
  Search,
  BarChart,
  ShieldCheck,
  FileCode,
  User,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <Building2 className="h-8 w-8" />,
    title: "Multi-tenancy support",
    description: "Create, switch, update organizations and invite members",
    link: "https://docs-next14-pro.thesaasfactory.dev/features/multi-tenancy",
  },
  {
    icon: <CreditCard className="h-8 w-8" />,
    title: "Billing and Subscriptions",
    description: "Manage payments and subscription plans",
    link: "https://docs-next14-pro.thesaasfactory.dev/features/subscriptionsPlansManagement",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Membership plan capabilities",
    description: "Support for various membership levels and features",
    link: "https://docs-next14-pro.thesaasfactory.dev/features/membershipPlanCapabilities",
  },
  {
    icon: <Layers className="h-8 w-8" />,
    title: "Onboarding Module",
    description: "Streamlined user onboarding process",
    link: "https://docs-next14-pro.thesaasfactory.dev/features/onboarding",
  },
  {
    icon: <Home className="h-8 w-8" />,
    title: "Landing Page",
    description: "Attractive and informative landing page",
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Responsive",
    description: "Fully responsive design for all devices",
    link: "https://docs-next14-pro.thesaasfactory.dev/features/responsive",
  },
  {
    icon: <Moon className="h-8 w-8" />,
    title: "Dark Theme",
    description: "Toggle between light and dark modes",
    link: "https://docs-next14-pro.thesaasfactory.dev/features/darktheme",
  },
  {
    icon: <LayoutDashboard className="h-8 w-8" />,
    title: "Dashboards",
    description: "For Tenant (Organizations) and Super Admin",
  },
  {
    icon: <Bell className="h-8 w-8" />,
    title: "Notifications Module",
    description: "Keep users informed with real-time notifications",
    link: "https://docs-next14-pro.thesaasfactory.dev/features/notificationModule",
  },
  {
    icon: <SwitchCamera className="h-8 w-8" />,
    title: "Organization Switcher",
    description: "Easily switch between different organizations",
    link: "https://docs-next14-pro.thesaasfactory.dev/features/membershipPlanCapabilities",
  },
  {
    icon: <Building className="h-8 w-8" />,
    title: "Organization Management",
    description: "Efficiently manage tenants and their data",
  },
  {
    icon: <Building className="h-8 w-8" />,
    title: "Organization Profile",
    description: "Customizable organization profiles",
    link: "https://docs-next14-pro.thesaasfactory.dev/features/organizationProfile",
  },
  {
    icon: <UserCircle className="h-8 w-8" />,
    title: "User Profile",
    description: "Customizable user profiles",
  },
  {
    icon: <TicketCheck className="h-8 w-8" />,
    title: "Ticket Support Module",
    description: "Efficient customer support system",
    link: "https://docs-next14-pro.thesaasfactory.dev/features/ticketSupportModule",
  },
  {
    icon: <Settings className="h-8 w-8" />,
    title: "Settings Module",
    description: "For Super Admins to manage system settings",
    link: "https://docs-next14-pro.thesaasfactory.dev/features/settingsModule",
  },
  {
    icon: <Megaphone className="h-8 w-8" />,
    title: "Marketing Module",
    description: "Tools for marketing campaigns and analytics",
  },
  {
    icon: <Receipt className="h-8 w-8" />,
    title: "Stripe Invoices and Memberships",
    description: "Integrated payment and membership management",
  },
  {
    icon: <Image className="h-8 w-8" />,
    title: "Imagekit Integration",
    description: "Efficient media storage and management",
    link: "https://docs-next14-pro.thesaasfactory.dev/features/imagekitIntegration",
  },
  {
    icon: <FormInput className="h-8 w-8" />,
    title: "Internal CRUD Components",
    description: "Quickly create CRUD operations with built-in components",
    link: "https://docs-next14-pro.thesaasfactory.dev/features/internalComponents",
  },
  {
    icon: <UserCog className="h-8 w-8" />,
    title: "User Management",
    description: "Comprehensive user administration tools",
  },
  {
    icon: <User className="h-8 w-8" />,
    title: "Subscriptions Management",
    description: "Handle various subscription models and plans",
  },
  {
    icon: <Search className="h-8 w-8" />,
    title: "SEO Friendly",
    description: "SSR by Next 14 for improved search engine visibility",
  },
  {
    icon: <BarChart className="h-8 w-8" />,
    title: "Vercel Analytics Integration",
    description: "Built-in analytics for performance monitoring",
  },
  {
    icon: <ShieldCheck className="h-8 w-8" />,
    title: "Role-based Access Control",
    description: "Granular permissions and access management",
    link: "https://docs-next14-pro.thesaasfactory.dev/features/roleBasedAccessControl",
  },
  {
    icon: <FileCode className="h-8 w-8" />,
    title: "Absolute Imports",
    description: "Use @ prefix for cleaner import statements",
  },
];

export default function FeaturesModules() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          Integrated Features
        </h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white dark:bg-gray-800">
              <CardHeader className="flex flex-col items-center space-y-1">
                {feature.icon}
                <CardTitle className="text-xl font-semibold text-center">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  {feature.description}
                </p>
                <div className="flex w-full">
                  <div className="flex   mx-auto ">
                    {feature.link && (
                      <Link href={feature.link}>
                        <span className="text-sm  text-center text-blue-500 dark:text-blue-400 hover:underline">
                          Learn more
                        </span>
                      </Link>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
