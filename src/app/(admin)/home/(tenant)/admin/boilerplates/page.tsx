"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";

export default function BoilerplatesPage() {
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
              <Card key={boilerplate.id} className="flex flex-col">
                <CardHeader>
                  <Image
                    src={boilerplate.image}
                    alt={boilerplate.name}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardTitle>{boilerplate.name}</CardTitle>
                  <CardDescription>{boilerplate.description}</CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">View More</Button>
                  <Button>Download</Button>
                </CardFooter>
              </Card>
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
    id: 1,
    name: "Next.js Starter Kit",
    description:
      "A complete boilerplate to quickly start projects with Next.js, TypeScript, and Tailwind CSS.",
    image: "/assets/img/bg2.jpg",
  },
  {
    id: 2,
    name: "React Native Boilerplate",
    description:
      "Initial template for mobile applications with React Native, including navigation and global state management.",
    image: "/assets/img/bg1.jpg",
  },
];
