"use client";

import { useEffect, useState } from "react";

import { TabCard } from "@/app/components/ui/TabCard";
import { EditableSetting } from "./ui/EditableSetting";
import { EditableList } from "./ui/EditableList";
import { FeatureList } from "./ui/FeaturesList";
import { CompetitorList } from "./ui/CompetidorList";
import { SwotSection } from "./ui/SwotSection";
import {
  deleteFeature,
  getRolesWithFeatures,
  updateProjectFeatures,
} from "@/actions/global/projectsModule/idea/features-actions";
import { getAllTenantRoles } from "@/actions/global/projectsModule/idea/roles-actions";
import { updasetProjectSetting } from "@/actions/global/projectsModule/upsert-project-setting";
import { toast } from "sonner";
import { getProjectSettings } from "@/actions/global/projectsModule/get-project-settings";
import NotFound from "@/components/layouts/errors/NotFound";
import {
  deleteCompetitor,
  getProjectCompetidors,
  upsertProejctCompetitor,
} from "@/actions/global/projectsModule/idea/competitos-actions";
import { ProjectCompetitor } from "@prisma/client";
import {
  getSwot,
  updateSwot,
} from "@/actions/global/projectsModule/idea/swot-actions";

export default function FactoryIdea({
  params: { projectId },
}: {
  params: { projectId: number };
}) {
  //Global States
  const [settings, setSettings] = useState<any>({
    description: "",
    problem: "",
    solution: "",
    niche: "",
    size: "",
    target: "",
    plans: [],
    capabilities: [],
    valuesproposition: [],
  });
  const [competitors, setCompetitors] = useState<ProjectCompetitor[]>();
  const [swotData, setSwotData] = useState({
    strengths: {
      items: [],
    },
    weaknesses: {
      items: [],
    },
    opportunities: {
      items: [],
    },
    threats: {
      items: [],
    },
  });
  const [roles, setRoles] = useState([]);
  const [features, setFeatures] = useState<any>({});

  //Get data from server
  const getRoles = async () => {
    const roles = await getAllTenantRoles(Number(projectId));
    setRoles(roles);
  };

  const getFeaturesData = async () => {
    const rolesWithFeatures = await getRolesWithFeatures(Number(projectId));
    setFeatures(rolesWithFeatures);
  };

  const getProjectSettingsFromServer = async () => {
    const settingsDb = await getProjectSettings(Number(projectId));
    console.log(settings);

    const parseValue = (value: any) => {
      if (
        typeof value === "string" &&
        value.startsWith("[") &&
        value.endsWith("]")
      ) {
        return JSON.parse(value);
      }
    };

    const settingsMap: { [key: string]: any } = settingsDb.reduce(
      (acc, setting) => {
        acc[setting.settingName] =
          parseValue(setting.settingValue) || setting.settingValue;
        return acc;
      },
      {},
    );

    //Find in setting as key that dont have value
    const keys = Object.keys(settings).filter((key) => !settingsMap[key]);
    keys.forEach((key) => {
      settingsMap[key] = settings[key];
    });

    setSettings(settingsMap);
  };

  const getCompetitorsFromServer = async () => {
    const competitors = await getProjectCompetidors(Number(projectId));
    setCompetitors(competitors);
  };

  const getSwotFromServer = async () => {
    const swot = await getSwot(Number(projectId));
    //if array empty, put default values
    console.log(swot);

    //If object is empty, put default values
    if (Object.keys(swot).length === 0) {
      return;
    }

    setSwotData(swot);
  };

  //Actions
  const handleAddFeature = async (role: string, feature: any) => {
    setFeatures((prev) => ({
      ...prev,
      [role]: [...prev[role], feature],
    }));

    await updateProjectFeatures(Number(projectId), role, feature);
  };

  const handleUpdateFeature = async (role: string, updatedFeature: any) => {
    setFeatures((prev) => ({
      ...prev,
      [role]: prev[role].map((f) =>
        f.id === updatedFeature.id ? updatedFeature : f,
      ),
    }));

    await updateProjectFeatures(Number(projectId), role, updatedFeature);
  };

  const handleRemoveFeature = async (role: string, id: string) => {
    setFeatures((prev) => ({
      ...prev,
      [role]: prev[role].filter((f) => f.id !== id),
    }));

    await deleteFeature(Number(projectId), id);
  };

  const handleReorderFeatures = (role: string, reorderedFeatures: any[]) => {
    setFeatures((prev) => ({
      ...prev,
      [role]: reorderedFeatures,
    }));

    reorderedFeatures.forEach(async (feature, index) => {
      await updateProjectFeatures(Number(projectId), role, {
        ...feature,
        position: index,
      });
    });
  };

  const handleEditProjectSetting = async (settingName, settingValue) => {
    await updasetProjectSetting(Number(projectId), {
      settingName,
      settingValue,
    }).catch(() => {
      toast.error("Error:" + settingName);
      console.log("Error");
    });

    setSettings((prev) => ({
      ...prev,
      [settingName]: settingValue,
    }));
  };

  const handleAddCompetitor = (competitor: ProjectCompetitor) => {
    setCompetitors([...competitors, competitor]);

    upsertProejctCompetitor(Number(projectId), competitor);
  };

  const handleEditCompetitor = async (competitor: ProjectCompetitor) => {
    const updatedCompetitors = competitors.map((c) =>
      c.id === competitor.id ? competitor : c,
    );

    setCompetitors(updatedCompetitors);

    await upsertProejctCompetitor(Number(projectId), competitor);
  };

  const handleDeleteCompetitor = async (id: string) => {
    setCompetitors(competitors.filter((c) => c.id !== id));
    await deleteCompetitor(Number(projectId), id);
  };

  const handleUpdateSwot = async (swotData) => {
    if (!swotData) return;
    await updateSwot(Number(projectId), swotData);
    console.log(swotData);
    setSwotData(swotData);
  };

  //Use Effects
  useEffect(() => {
    if (!projectId) return;
    getSwotFromServer();
    getProjectSettingsFromServer();
    getRoles();
    getFeaturesData();
    getCompetitorsFromServer();
  }, [projectId]);

  if (!projectId) return <NotFound message="Project not found" />;

  return (
    <div>
      <div>
        <div className="grid gap-6 rounded-xl    ">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column */}
            <div className="space-y-6">
              <TabCard
                title="Problem and Solution"
                tabs={[
                  {
                    value: "sumamry",
                    label: "Summary",
                    content: (
                      <EditableSetting
                        setting={settings.description}
                        onUpdate={(v: string) =>
                          handleEditProjectSetting("description", v)
                        }
                      />
                    ),
                  },
                  {
                    value: "problem",
                    label: "Problem",
                    content: (
                      <EditableSetting
                        setting={settings.problem}
                        onUpdate={(v: string) =>
                          handleEditProjectSetting("problem", v)
                        }
                      />
                    ),
                  },
                  {
                    value: "solution",
                    label: "Solution",
                    content: (
                      <EditableSetting
                        setting={settings.solution}
                        onUpdate={(v: string) =>
                          handleEditProjectSetting("solution", v)
                        }
                      />
                    ),
                  },
                ]}
              />

              <TabCard
                title="Prices"
                tabs={[
                  {
                    value: "plans",
                    label: "Plans",
                    content: (
                      // <EditableList
                      //   items={planes}
                      //   onAdd={(item) => setPlanes([...planes, item])}
                      //   onRemove={(index) =>
                      //     setPlanes(planes.filter((_, i) => i !== index))
                      //   }
                      // />
                      <EditableList
                        items={settings.plans}
                        onAdd={(item) => {
                          handleEditProjectSetting("plans", [
                            ...settings.plans,
                            item,
                          ]);
                        }}
                        onRemove={(index) =>
                          handleEditProjectSetting(
                            "plans",
                            settings.plans.filter((_, i) => i !== index),
                          )
                        }
                      />
                    ),
                  },
                  {
                    value: "capacidades",
                    label: "Capabilities",
                    content: (
                      <EditableList
                        items={settings.capabilities}
                        onAdd={(item) => {
                          handleEditProjectSetting("capabilities", [
                            ...settings.capabilities,
                            item,
                          ]);
                        }}
                        onRemove={(index) =>
                          handleEditProjectSetting(
                            "capabilities",
                            settings.capabilities.filter((_, i) => i !== index),
                          )
                        }
                      />
                    ),
                  },
                ]}
              />
            </div>

            <TabCard
              title="Diference"
              tabs={[
                {
                  value: "value",
                  label: "Value proposition",
                  content: (
                    <EditableList
                      items={settings.valuesproposition}
                      onAdd={(item) => {
                        handleEditProjectSetting("valuesproposition", [
                          ...settings.valuesproposition,
                          item,
                        ]);
                      }}
                      onRemove={(index) =>
                        handleEditProjectSetting(
                          "valuesproposition",
                          settings.valuesproposition.filter(
                            (_, i) => i !== index,
                          ),
                        )
                      }
                    />
                  ),
                },
                {
                  value: "features",
                  label: "Features",
                  content: (
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
                              onRemove={(id) =>
                                handleRemoveFeature(role.name, id)
                              }
                              onReorder={(reorderedFeatures) =>
                                handleReorderFeatures(
                                  role.name,
                                  reorderedFeatures,
                                )
                              }
                            />
                          </div>
                        ),
                      }))}
                    />
                  ),
                },
              ]}
            />

            {/* Right Column */}
            <div className="space-y-6">
              <TabCard
                title="Competitors"
                tabs={[
                  {
                    value: "competitots",
                    label: "Competitors",
                    content: (
                      <CompetitorList
                        competitors={competitors}
                        onAdd={(competitor) => handleAddCompetitor(competitor)}
                        onRemove={(id) => handleDeleteCompetitor(id)}
                        onUpdate={(updatedCompetitor) => {
                          handleEditCompetitor(updatedCompetitor);
                          // setCompetitors(
                          //   competitors.map((c) =>
                          //     c.id === updatedCompetitor.id
                          //       ? updatedCompetitor
                          //       : c,
                          //   ),
                          // );
                        }}
                      />
                    ),
                  },
                  {
                    value: "foda",
                    label: "SWOT",
                    content: (
                      <SwotSection
                        data={swotData}
                        onUpdate={handleUpdateSwot}
                      />
                    ),
                  },
                ]}
              />

              <TabCard
                title="Market"
                tabs={[
                  {
                    value: "niche",
                    label: "Niche",
                    content: (
                      <EditableSetting
                        setting={settings.niche}
                        onUpdate={(v: string) =>
                          handleEditProjectSetting("niche", v)
                        }
                      />
                    ),
                  },
                  {
                    value: "size",
                    label: "Size",
                    content: (
                      <EditableSetting
                        setting={settings.size}
                        onUpdate={(v: string) =>
                          handleEditProjectSetting("size", v)
                        }
                      />
                    ),
                  },
                  {
                    value: "icp",
                    label: "Target ",
                    content: (
                      <EditableSetting
                        setting={settings.target}
                        onUpdate={(v: string) =>
                          handleEditProjectSetting("target", v)
                        }
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
