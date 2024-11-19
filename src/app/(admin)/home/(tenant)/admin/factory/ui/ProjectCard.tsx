"use client";
import { Badge } from "@/components/ui/badge";
import { Project } from "@prisma/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {   FactoryIcon, MegaphoneIcon, ShoppingBag } from "lucide-react";
import Link from "next/link";

const getStatusColor = (status: Project["status"]) => {
  switch (status) {
    case "IDEA":
      return "bg-blue-500";
    case "VALIDATION":
      return "bg-yellow-500";
    case "PRODUCTION":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Card key={project.id} className="flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>{project.name}</CardTitle>
          <Badge className={getStatusColor(project.status)}>
            {project.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p>{project.description.substr(0, 100)}</p>
      </CardContent>
      <CardFooter className="flex space-x-3">
        <Link href={`/home/admin/factory/${project.id}/idea`}>
          <Button variant="outline" className="w-full">
            Factory <FactoryIcon className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <Link href={`/home/admin/factory/${project.id}/idea`}>
          <Button variant="outline" className="w-full">
            Sell <ShoppingBag className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <Link href={`/home/admin/factory/${project.id}/idea`}>
          <Button variant="outline" className="w-full">
            Publish <MegaphoneIcon className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
