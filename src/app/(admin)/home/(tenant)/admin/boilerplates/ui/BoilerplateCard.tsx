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
import Link from "next/link";
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
        {!boilerplate.isPro ? (
          <Button onClick={handleDownload} className="ml-2">
            Download
          </Button>
        ) : (
          <>
            {canDowloadProRepos ? (
              <Button onClick={handleDownload} className="ml-2">
                {" "}
                Download{" "}
              </Button>
            ) : (
              <div className="flex">
               
                <Link href={"/home/settings/billing/buyPlan"}>
                  <Button variant="secondary" className="w-full">
                    Upgrade for download
                    <span className="relative ml-3 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                    </span>
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
};
