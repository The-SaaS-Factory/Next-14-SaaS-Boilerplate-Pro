"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PageName from "@/components/ui/commons/PageName";
import { createProject } from "@/actions/global/projectsModule/create-project";
import { getAllTenantProjects } from "@/actions/global/projectsModule/get-all-tenant-projects";
import { Project } from "@prisma/client";
import { toast } from "sonner";
import ProjectCard from "../ui/ProjectCard";
import { track } from "@vercel/analytics";

export default function FactoryLobby() {
  const [projects, setProjects] = useState<Project[]>([] as Project[]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newProject, setNewProject] = useState<{
    name: string;
    summary: string;
    status: Project["status"];
  }>({ name: "", summary: "", status: "IDEA" });

  const handleCreateProject = async () => {
    await createProject(newProject.name, newProject.summary, newProject.status)
      .then(() => {
        track("new_project_created");
        toast.success("Project created successfully");
        setIsDialogOpen(false);
        getAllProjects();
        setNewProject({ name: "", summary: "", status: "IDEA" });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const getAllProjects = async () => {
    const projects: Project[] = await getAllTenantProjects();
    setProjects(projects as Project[]);
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <div>
      <PageName name="My Projects" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Card className="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
              <CardContent className="flex flex-col items-center justify-center h-full">
                <Plus className="h-12 w-12 text mb-2" />
                <p className="text-lg text font-semibold">
                  {" "}
                  Create new project
                </p>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                <h2 className="text-lg text font-semibold">
                  Create new project
                </h2>
              </DialogTitle>
            </DialogHeader>
            <div className="grid text gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="name">Name</label>
                <Input
                  id="name"
                  value={newProject.name}
                  onChange={(e) =>
                    setNewProject({ ...newProject, name: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="summary">Summary</label>
                <Input
                  id="summary"
                  value={newProject.summary}
                  onChange={(e) =>
                    setNewProject({ ...newProject, summary: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="status">Status</label>
                <Select
                  value={newProject.status}
                  onValueChange={(value) =>
                    setNewProject({
                      ...newProject,
                      status: value as Project["status"],
                    })
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IDEA">Idea</SelectItem>
                    <SelectItem value="VALIDATION">Validation</SelectItem>
                    <SelectItem value="PRODUCTION">Production</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleCreateProject}>Create</Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
