"use client";

import { useEffect, useState } from "react";

import { TabCard } from "@/app/components/ui/TabCard";
 
import PageName from "@/components/ui/commons/PageName";
import {
  getRolesWithFeatures,
  updateRoleFeatures,
} from "@/actions/global/projectsModule/idea/features-actions";
import { getAllTenantRoles } from "@/actions/global/projectsModule/idea/roles-actions";

interface Competitor {
  id: string;
  name: string;
  url: string;
  notes: string;
}

interface SubFeature {
  id: string;
  text: string;
}

interface Feature {
  id: string;
  text: string;
  subFeatures: SubFeature[];
}

export default function FactoryIdea() {
    return <div></div>
}