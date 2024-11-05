"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { motion } from "framer-motion";
import { BoilerplateCard } from "./ui/BoilerplateCard";
import { useMembership } from "@/utils/hooks/useMembership";
import { constants } from "@/lib/constants";

export default function BoilerplatesPage() {
  const { organization, checkOrganizationCapability } = useMembership();

  const canDowloadProRepos = checkOrganizationCapability({
    capabilityName: "Download Pro Repositories",
  });

  console.log(canDowloadProRepos);

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
            {constants.boilerplates.map((boilerplate) => (
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
