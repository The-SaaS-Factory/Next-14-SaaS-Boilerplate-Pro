"use client";

import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { TabCard } from "@/app/components/ui/TabCard";
import { EditableDescription } from "../[projectId]/idea/ui/EditableSetting";
import { EditableList } from "../[projectId]/idea/ui/EditableList";
import { FeatureList } from "../[projectId]/idea/ui/FeaturesList";
import { CompetitorList } from "../[projectId]/idea/ui/CompetidorList";
import { FodaSection } from "../[projectId]/idea/ui/SwotSection";
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
  //Globals Hooks and states
  const searchParams = useSearchParams();
  const projectId = Number(searchParams.get("projectId"));
  const [competitors, setCompetitors] = useState<Competitor[]>();
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

  //Get data from the server
  const getRoles = async () => {
    const roles = await getAllTenantRoles(projectId);
    setRoles(roles);
  };

  const getRolesFeaturesData = async () => {
    const rolesWithFeatures = await getRolesWithFeatures(projectId);
    setFeatures(rolesWithFeatures);
  };

  //Local Actions
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


  //Use Effects
  useEffect(() => {
    if (!projectId) return;
    getRoles();
    getRolesFeaturesData();
  }, [projectId]);


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
                    label: "SWOT",
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
