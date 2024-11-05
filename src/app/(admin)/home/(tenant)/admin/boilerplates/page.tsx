"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { motion } from "framer-motion";
import { BoilerplateCard } from "./ui/BoilerplateCard";
import { useMembership } from "@/utils/hooks/useMembership";
import { checkOrganizationCapability } from "@/utils/facades/serverFacades/membershipFacade";

export default function BoilerplatesPage() {
  const { userMembership, organization } = useMembership();

  const canDowloadProRepos = checkOrganizationCapability({
    capabilityName: "Support via ticket",
    organizationCapabilities: organization?.organizationCapabilities,
    subscription: organization?.subscription,
  });

  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="boilerplates" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="boilerplates">Boilerplates</TabsTrigger>
          <TabsTrigger value="landingpages">Landing Pages</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
        </TabsList>
        <TabsContent value="boilerplates">
          <h2 className="text-2xl font-bold mb-4">Boilerplates</h2>
          <div className="grid md:grid-cols-3  gap-6">
            {boilerplates.map((boilerplate) => (
              <BoilerplateCard
                canDowloadProRepos={canDowloadProRepos}
                boilerplate={boilerplate}
                key={boilerplate.id}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="landingpages">
          <h2 className="text-2xl font-bold mb-4">Landing Pages</h2>
          <ComingSoon />
        </TabsContent>
        <TabsContent value="components">
          <h2 className="text-2xl font-bold mb-4">Components</h2>
          <ComingSoon />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ComingSoon() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="flex justify-center items-center h-64"
    >
      <h3 className="text-3xl font-bold text-primary">Coming Soon!</h3>
    </motion.div>
  );
}

const boilerplates = [
  {
    isPro: false,
    id: 1,
    name: "Next 14 FullStack SaaS Boilerplate",
    githubName: "next-14-saas-boilerplate",
    description:
      "A complete boilerplate to quickly start projects with Next.js, TypeScript, and Tailwind CSS.",
    image: "/assets/img/boilerplates/free/cover.webp",
  },
  {
    isPro: true,
    id: 2,
    name: "Next 14 FullStack SaaS Boilerplate PRO",
    githubName: "Next-14-SaaS-Boilerplate-Pro",
    description:
      "A complete boilerplate with superpowers to quickly start projects with Next.js, TypeScript, and Tailwind CSS.",
    image: "/assets/img/boilerplates/pro/1600x800.png",
  },
];
