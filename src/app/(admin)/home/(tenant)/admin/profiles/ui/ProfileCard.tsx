"use client";
import { Badge } from "@/components/ui/badge";
import { Profile, ProfileType, Project, ProjectStatus } from "@prisma/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Edit2,
  Eye,
  FactoryIcon,
  MegaphoneIcon,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";

const getTypeColor = (type: ProfileType) => {
  switch (type) {
    case ProfileType.DIRECTORYDEVELOPER:
      return "bg-blue-500";
    case ProfileType.DIRECTORYPROJECT:
      return "bg-yellow-500";
    case ProfileType.DIRECTORYTOOLS:
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

const getTypeName = (type: ProfileType) => {
  switch (type) {
    case ProfileType.DIRECTORYDEVELOPER:
      return "Developer";
    case ProfileType.DIRECTORYPROJECT:
      return "Project";
    case ProfileType.DIRECTORYTOOLS:
      return "Tools";
    default:
      return "Unknown";
  }
};

export default function ProfileCard({ profile }: { profile: Profile }) {
  const link =
    profile.type === ProfileType.DIRECTORYPROJECT
      ? `/projects/${profile.slug}`
      : profile.type === ProfileType.DIRECTORYDEVELOPER
        ? `/developers/${profile.slug}`
        : `/tools/${profile.slug}`;

  return (
    <Card key={profile.id} className="flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>{profile.name}</CardTitle>
          <Badge className={getTypeColor(profile.type)}>
            {getTypeName(profile.type)}
          </Badge>
        </div>
      </CardHeader>
      <CardFooter className="flex space-x-3">
        <Link href={link}>
          <Button variant="outline" className="w-full">
            View <Eye className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <Link href={`/home/admin/profiles/edit/${profile.id}`}>
          <Button variant="outline" className="w-full">
            Edit <Edit2 className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <Button disabled variant="outline" className="w-full">
          Promo <MegaphoneIcon className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
