import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  EyeIcon,
  FileTextIcon,
  DownloadIcon,
  CheckIcon,
  XIcon,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SaaS Boilerplates",
  description:
    "The best boilerplates to start your next SaaS project. Next js, Tailwind CSS, Prisma, Clerk, NextAuth, TypeScript, and more.",
};

const features = [
  {
    name: "Multi-tenancy support",
    free: "Create, switch, update organization and invite members (Clerk)",
    pro: "Create, switch, update organization and invite members (Internal custom system)",
  },

  {
    name: "Dashboards",
    free: "Admin and Super Admin",
    pro: "Tenant (Organizations) and Super Admin",
  },

  { name: "Organization Switcher", free: "Clerk", pro: true },
  { name: "Organization Profile", free: "Clerk", pro: true },
  { name: "User Profile", free: "Clerk", pro: true },
  {
    name: "Billing and Subscriptions",
    free: "Stripe Invoices and memberships",
    pro: "Stripe Invoices and memberships (Enhanced)",
  },
  {
    name: "Promotions and Coupons",
    free: "Stripe",
    pro: "Stripe (Enhanced)",
  },
  {
    name: "CRUD Components",
    free: "Internal components for quick CRUD creation (newForm)",
    pro: "Internal components for quick CRUD creation (newForm)",
  },
  { name: "SEO Optimization", free: "SSR (Next 14)", pro: "SSR (Next 14)" },
  {
    name: "Organization Management",
    free: true,
    pro: true,
  },
  { name: "Membership Plan Capabilities Support", free: true, pro: true },
  { name: "User Onboarding", free: true, pro: true },
  { name: "Vercel Analytics Integration", free: true, pro: true },
  { name: "Role-based Access Control", free: true, pro: true },
  { name: "Marketing Module", free: true, pro: true },
  { name: "Super Admin Settings Module", free: true, pro: true },
  { name: "Imagekit Integration for Media Storage", free: true, pro: true },
  {
    name: "Social Authentication",
    free: true,
    pro: true,
  },
  { name: "Notifications Module", free: true, pro: true },
  { name: "Ticket Support Module", free: true, pro: true },
  { name: "Responsive Design", free: true, pro: true },
  { name: "Dark Theme", free: true, pro: true },
  { name: "Landing Page", free: true, pro: true },
  { name: "KPIs Module", free: true, pro: false },
  {
    name: "Internationalization support",
    free: "Full support (Frontend components and Dynamic Data)",
    pro: false,
  },
  {
    name: "Affiliate System",
    free: "Affiliate Panel and Payments with Commissions",
    pro: false,
  },
  {
    name: "Blog Module - MDX Version",
    free: false,
    pro: true,
  },
];
export default function BoilerplatesPage() {
  return (
    <div className="w-full space-y-12 py-12">
      {/* Hero Section */}
      <section className=" relative   g-main overflow-hidden py-20">
        <div className=" container inset-0   z-0">
          <div className="relative z-10">
            <h1 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12">
              SaaS Boilerplates
            </h1>
            <div className="grid  px-3 lg:px-0 gap-6 md:grid-cols-2">
              {/* Free Version */}
              <Card>
                <CardHeader>
                  <CardTitle>Next 14 FullStack SaaS Boilerplate</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Clerk - Next 14 - TS - Prisma - Tailwind
                  </p>
                </CardHeader>
                <CardFooter className="flex gap-2">
                  <Link
                    target="_blank"
                    href={"https://next14.thesaasfactory.dev"}
                  >
                    <Button variant="outline" size="sm">
                      <EyeIcon className="mr-2 h-4 w-4" />
                      Demo
                    </Button>
                  </Link>

                  <Link
                    target="_blank"
                    href={"https://docs-next14.thesaasfactory.dev/"}
                  >
                    <Button variant="outline" size="sm">
                      <FileTextIcon className="mr-2 h-4 w-4" />
                      Doc
                    </Button>
                  </Link>

                  <Link href={"/home/admin/boilerplates"}>
                    <Button size="sm">
                      <DownloadIcon className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Pro Version */}
              <Card className="border-primary ">
                <CardHeader>
                  <CardTitle className="flex text-coloride items-center gap-2">
                    Next 14 FullStack SaaS Boilerplate
                    <span className="rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground">
                      PRO
                    </span>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Next Auth - Next 14 - TS - Prisma - Tailwind
                  </p>
                </CardHeader>
                <CardFooter className="flex gap-2">
                  <Link
                    target="_blank"
                    href={"https://next14pro.thesaasfactory.dev/"}
                  >
                    <Button variant="outline" size="sm">
                      <EyeIcon className="mr-2 h-4 w-4" />
                      Demo
                    </Button>
                  </Link>

                  <Link
                    target="_blank"
                    href={"https://docs-next14-pro.thesaasfactory.dev/"}
                  >
                    <Button variant="outline" size="sm">
                      <FileTextIcon className="mr-2 h-4 w-4" />
                      Doc
                    </Button>
                  </Link>

                  <Link href={"/home/admin/boilerplates"}>
                    <Button size="sm">
                      <DownloadIcon className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="container  px-3 lg:px-0">
        <h2 className="text-2xl font-bold tracking-tight mb-8">
          Feature Comparison
        </h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Feature</TableHead>
              <TableHead>Free Version</TableHead>
              <TableHead>Pro Version</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {features.map((feature) => (
              <TableRow key={feature.name}>
                <TableCell className="font-medium">{feature.name}</TableCell>
                <TableCell>
                  {typeof feature.free === "boolean" ? (
                    feature.free ? (
                      <CheckIcon className="h-4 w-4 text-green-500" />
                    ) : (
                      <XIcon className="h-4 w-4 text-red-500" />
                    )
                  ) : (
                    feature.free
                  )}
                </TableCell>
                <TableCell>
                  {typeof feature.pro === "boolean" ? (
                    feature.pro ? (
                      <CheckIcon className="h-4 w-4 text-green-500" />
                    ) : (
                      <XIcon className="h-4 w-4 text-red-500" />
                    )
                  ) : (
                    feature.pro
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
