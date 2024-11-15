"use client";

import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { TabCard } from "@/app/components/ui/TabCard";
import { EditableDescription } from "./ui/EditableDescription";
import { EditableList } from "./ui/EditableList";
import { FeatureList } from "./ui/FeaturesList";
import { CompetitorList } from "./ui/CompetidorList";
import { FodaSection } from "./ui/FodaSection";
import PageName from "@/components/ui/commons/PageName";
import {
  getRolesWithFeatures,
  updateRoleFeatures,
} from "@/actions/global/projectsModule/idea/features-actions";
import { useSearchParams } from "next/navigation";
import { getAllTenantRoles } from "@/actions/global/projectsModule/idea/roles-actions";
import { ProjectFeature } from "@prisma/client";

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
  const searchParams = useSearchParams();
  const projectId = Number(searchParams.get("projectId"));

  const [description, setDescription] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  );
  const [planes, setPlanes] = useState([
    "Plan Básico",
    "Plan Pro",
    "Enterprise",
  ]);
  const [capacidades, setCapacidades] = useState([
    "API Access",
    "Analytics",
    "Support 24/7",
  ]);
  const [competitors, setCompetitors] = useState<Competitor[]>([
    {
      id: "1",
      name: "Empresa A",
      url: "https://empresaa.com",
      notes: "Competidor principal en el mercado enterprise",
    },
  ]);

  const [fodaData, setFodaData] = useState({
    fortalezas: {
      items: [{ id: "1", text: "Tecnología innovadora" }],
    },
    debilidades: {
      items: [{ id: "2", text: "Equipo pequeño" }],
    },
    oportunidades: {
      items: [{ id: "3", text: "Mercado en crecimiento" }],
    },
    amenazas: {
      items: [{ id: "4", text: "Nuevos competidores" }],
    },
  });

  const [roles, setRoles] = useState([]);

  const [features, setFeatures] = useState<any>({});

  // const [features, setFeatures] = useState<RoleFeatures>({
  //   Todos: [
  //     {
  //       id: "1",
  //       text: "Feature 1",
  //       subFeatures: [
  //         { id: "1.1", text: "Sub-feature 1.1" },
  //         { id: "1.2", text: "Sub-feature 1.2" },
  //       ],
  //     },
  //   ],
  //   Super4: [],
  //   Tenant: [],
  //   CR: [],
  // });

  const getRoles = async () => {
    const roles = await getAllTenantRoles(projectId);
    setRoles(roles);
  };
  const getRolesFeaturesData = async () => {
    const rolesWithFeatures = await getRolesWithFeatures(projectId);
    setFeatures(rolesWithFeatures);
  };
  useEffect(() => {
    if (!projectId) return;
    getRoles();
    getRolesFeaturesData();
  }, [projectId]);

  const handleAddFeature = (role: string, feature: Feature) => {
    setFeatures((prev) => ({
      ...prev,
      [role]: [...prev[role], feature],
    }));
  };

  const handleUpdateFeature = async (role: string, updatedFeature: Feature) => {
    setFeatures((prev) => ({
      ...prev,
      [role]: prev[role].map((f) =>
        f.id === updatedFeature.id ? updatedFeature : f,
      ),
    }));

    console.log(features);
    
    await updateRoleFeatures(projectId, role, updatedFeature);
  };

  const handleRemoveFeature = (role: string, id: string) => {
    setFeatures((prev) => ({
      ...prev,
      [role]: prev[role].filter((f) => f.id !== id),
    }));
  };

  const handleReorderFeatures = (
    role: string,
    reorderedFeatures: Feature[],
  ) => {
    setFeatures((prev) => ({
      ...prev,
      [role]: reorderedFeatures,
    }));
  };

  if (!projectId) return <div>Project not found</div>;

  return (
    <div>
      <div>
        <PageName name="Idea" />

        <div className="grid gap-6 rounded-xl border-2 border-gray-200  p-6 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column */}
            <div className="space-y-6">
              <TabCard
                title="Resumen"
                tabs={[
                  {
                    value: "descripcion",
                    label: "Descripción",
                    content: (
                      <EditableDescription
                        description={description}
                        onUpdate={setDescription}
                      />
                    ),
                  },
                ]}
              />

              <TabCard
                title="Modelo de negocio"
                tabs={[
                  {
                    value: "planes",
                    label: "Planes",
                    content: (
                      <EditableList
                        items={planes}
                        onAdd={(item) => setPlanes([...planes, item])}
                        onRemove={(index) =>
                          setPlanes(planes.filter((_, i) => i !== index))
                        }
                      />
                    ),
                  },
                  {
                    value: "capacidades",
                    label: "Capacidades",
                    content: (
                      <EditableList
                        items={capacidades}
                        onAdd={(item) => setCapacidades([...capacidades, item])}
                        onRemove={(index) =>
                          setCapacidades(
                            capacidades.filter((_, i) => i !== index),
                          )
                        }
                      />
                    ),
                  },
                ]}
              />
            </div>

            {/* Middle Column */}
            {roles.length > 0 && (
              <TabCard
                title="Features"
                tabs={roles?.map((role) => ({
                  value: role.name.toLowerCase(),
                  label: role.name,
                  content: (
                    <div className="space-y-4">
                      <FeatureList
                        features={features[role.name]}
                        onAdd={(feature) =>
                          handleAddFeature(role.name, feature)
                        }
                        onUpdate={(feature) =>
                          handleUpdateFeature(role.name, feature)
                        }
                        onRemove={(id) => handleRemoveFeature(role.name, id)}
                        onReorder={(reorderedFeatures) =>
                          handleReorderFeatures(role.name, reorderedFeatures)
                        }
                      />
                    </div>
                  ),
                }))}
              />
            )}

            {/* Right Column */}
            <div className="space-y-6">
              <TabCard
                title="Competencia"
                tabs={[
                  {
                    value: "competidores",
                    label: "Competidores",
                    content: (
                      <CompetitorList
                        competitors={competitors}
                        onAdd={(competitor) =>
                          setCompetitors([...competitors, competitor])
                        }
                        onRemove={(id) =>
                          setCompetitors(competitors.filter((c) => c.id !== id))
                        }
                        onUpdate={(updatedCompetitor) => {
                          setCompetitors(
                            competitors.map((c) =>
                              c.id === updatedCompetitor.id
                                ? updatedCompetitor
                                : c,
                            ),
                          );
                        }}
                      />
                    ),
                  },
                  {
                    value: "foda",
                    label: "FODA",
                    content: (
                      <FodaSection data={fodaData} onUpdate={setFodaData} />
                    ),
                  },
                ]}
              />

              <TabCard
                title="Mercado"
                tabs={[
                  {
                    value: "nicho",
                    label: "Nicho",
                    content: (
                      <EditableDescription
                        description="B2B SaaS"
                        onUpdate={() => {}}
                      />
                    ),
                  },
                  {
                    value: "tamano",
                    label: "Tamaño",
                    content: (
                      <EditableDescription
                        description="$50B"
                        onUpdate={() => {}}
                      />
                    ),
                  },
                  {
                    value: "icp",
                    label: "ICP",
                    content: (
                      <EditableDescription
                        description="Enterprise"
                        onUpdate={() => {}}
                      />
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
