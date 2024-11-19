"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sendGAEvent } from "@next/third-parties/google";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/app/components/ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMembership } from "@/utils/hooks/useMembership";

// Componente principal
export default function ServicesPage() {
  const { organization } = useMembership();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  // Función handler para enviar datos del formulario
  const onSubmit = async (data) => {
    // Construye el payload usando los datos del formulario
    const formData = {
      projectName: data.projectName,
      budget: data.budget,
      description: data.description,
      urgency: data.urgency,
      stack: data.stack,
      userId: organization?.id,
      userName: organization?.name,
      userEmail: organization?.email,
    };

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        sendGAEvent("conversion_event_request_quote", "new service requested", {
          value: organization?.name,
        });
        toast.success("Service request sent successfully");
      } else {
        toast.error(`Error: ${result.error}`);
      }
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    }
    // Enviar el payload a la acción
    // Aquí puedes llamar a la función que realiza la acción
    // Aquí podrías realizar la llamada a una acción como enviar a la API
    // sendAction(payload);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Services and Contracting</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Lista de Servicios Contratados */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Contracted Services</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              You not have any services contracted yet.
            </table>
          </div>
        </div>

        {/* Formulario para Nuevo Servicio */}
        <div>
          <Card className="mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <CardHeader>
              <CardTitle className="text-white">
                Why Choose Our Service?
              </CardTitle>
              <CardDescription className="text-white">
                We offer top-notch development services with a focus on quality
                and timely delivery.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white mb-4">
                Our team of experts ensures that your project is completed to
                the highest standards.
              </p>
              <Link
                href="/why-choose-us"
                className="text-white underline hover:text-gray-200"
              >
                Learn more about our services
              </Link>
            </CardContent>
          </Card>

          <h2 className="text-xl font-semibold mb-4">Contract New Service</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                placeholder="Enter project name"
                {...register("projectName", { required: true })}
              />
              {errors.projectName && (
                <p className="text-red-500">Project Name is required</p>
              )}
            </div>
            <div>
              <Label htmlFor="budget">Estimated Budget</Label>
              <Select onValueChange={(value) => setValue("budget", value)}>
                <SelectTrigger id="budget">
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Less than $5,000</SelectItem>
                  <SelectItem value="medium">$5,000 - $10,000</SelectItem>
                  <SelectItem value="high">More than $10,000</SelectItem>
                </SelectContent>
              </Select>
              {errors.budget && (
                <p className="text-red-500">Budget is required</p>
              )}
            </div>
            <div>
              <Label htmlFor="description">Project Overview</Label>
              <Textarea
                id="description"
                placeholder="Briefly describe your project"
                {...register("description", { required: true })}
              />
              {errors.description && (
                <p className="text-red-500">Description is required</p>
              )}
            </div>
            <div>
              <Label htmlFor="urgency">Project Urgency</Label>
              <Select onValueChange={(value) => setValue("urgency", value)}>
                <SelectTrigger id="urgency">
                  <SelectValue placeholder="Select urgency level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
              {errors.urgency && (
                <p className="text-red-500">Urgency level is required</p>
              )}
            </div>
            <div>
              <Label htmlFor="stack">Desired Tech Stack</Label>
              <Input
                id="stack"
                placeholder="E.g., React, Node.js, MongoDB"
                {...register("stack", { required: true })}
              />
              {errors.stack && (
                <p className="text-red-500">Tech stack is required</p>
              )}
            </div>
            <Button type="submit">Submit Request</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
