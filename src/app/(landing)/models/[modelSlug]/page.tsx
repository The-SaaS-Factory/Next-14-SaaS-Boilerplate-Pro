"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Phone, MapPin, Calendar, Star, Lock } from "lucide-react";
import Image from "next/image";

const talentData = {
  name: "María García",
  email: "maria.garcia@email.com",
  phone: "+34 123 456 789",
  location: "Madrid, España",
  birthdate: "15/05/1995",
  rating: 4.8,
  description:
    "Actriz versátil con experiencia en teatro, cine y televisión. Especializada en drama y comedia. Ganadora del premio a Mejor Actriz Revelación en el Festival de Cine Independiente de Madrid 2022.",
  avatar: "/assets/img/avatar1.jpg",
  gallery: [
    "/assets/img/bg1.jpg",
    "/assets/img/bg2.jpg",
    "/assets/img/bg3.jpg",
    "/assets/img/bg4.jpg",
    "/assets/img/bg5.jpg",
    "/assets/img/bg6.jpg",
    "/assets/img/bg7.jpg",
    "/assets/img/bg8.jpg",
  ],
};

export default function TalentProfilePage() {
  const [activeTab, setActiveTab] = useState("resumen");

  return (
    <div className="min-h-screen bg-gray-100 py-12 pt-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={talentData.avatar} alt={talentData.name} />
                  <AvatarFallback>
                    {talentData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h1 className="text-2xl font-bold mt-4">{talentData.name}</h1>
                <div className="flex items-center mt-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="ml-1">{talentData.rating}</span>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  <span>{talentData.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  <span>{talentData.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{talentData.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{talentData.birthdate}</span>
                </div>
              </div>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="mt-6"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="resumen">Resumen</TabsTrigger>
                <TabsTrigger value="galeria">Galería</TabsTrigger>
                <TabsTrigger value="contacto">Contacto</TabsTrigger>
              </TabsList>
              <TabsContent value="resumen" className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Sobre mí</h2>
                <p>{talentData.description}</p>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    <span>{talentData.name}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    <span>{talentData.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-2" />
                    <span>{talentData.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{talentData.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span>{talentData.birthdate}</span>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="galeria" className="mt-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {talentData.gallery.map((item, index) => (
                    <div key={index} className="relative aspect-square">
                      <Image
                        src={item}
                        alt={`Galería ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="contacto" className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 backdrop-blur-sm flex items-center justify-center z-10">
                    <div className="bg-white/80 p-6 rounded-lg shadow-lg text-center">
                      <Lock className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                      <p className="text-xl font-semibold">
                        Contacto Bloqueado
                      </p>
                      <p className="mt-2 text-gray-600">
                        Necesitas permisos adicionales para ver esta
                        información.
                      </p>
                    </div>
                  </div>
                  <div className="opacity-20">
                    <h2 className="text-xl font-semibold mb-4">
                      Información de Contacto
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 mr-2" />
                        <span>{talentData.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 mr-2" />
                        <span>{talentData.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 mr-2" />
                        <span>{talentData.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
