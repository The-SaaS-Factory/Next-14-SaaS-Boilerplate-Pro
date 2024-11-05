"use client";
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
export const BoilerplateCard = ({ boilerplate, canDowloadProRepos }) => {
  const repoName = boilerplate.githubName;

  const handleDownload = async () => {
    if (!repoName) return;

    try {
      const response = await fetch(`/api/github?repo=${repoName}`);

      if (!response.ok) throw new Error("Error al descargar el repositorio");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Crear un enlace de descarga
      const a = document.createElement("a");
      a.href = url;
      a.download = `${repoName}-main.zip`;
      a.click();

      // Liberar el objeto URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
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
        <CardDescription className="mt-3">
          {boilerplate.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">View More</Button>
        {canDowloadProRepos ? (
          <Button onClick={handleDownload} className="ml-2">
            {" "}
            Download{" "}
          </Button>
        ) : (
          <Button disabled variant="outline" className="ml-2">
            Download
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
