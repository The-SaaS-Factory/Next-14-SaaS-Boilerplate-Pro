"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Check, X } from "lucide-react";
import AllCastingList from "../ui/AllCastingList";
import PageName from "@/components/ui/commons/PageName";

// Datos de ejemplo
// const castings = [
//   {
//     id: 1,
//     title: "Protagonista Serie TV",
//     roles: ["Actor principal", "Actriz principal"],
//     daysPublished: 5,
//     visits: 1200,
//   },
//   {
//     id: 2,
//     title: "Modelo Campaña Verano",
//     roles: ["Modelo femenino", "Modelo masculino"],
//     daysPublished: 3,
//     visits: 800,
//   },
//   {
//     id: 3,
//     title: "Voz para Animación",
//     roles: ["Actor de voz"],
//     daysPublished: 7,
//     visits: 600,
//   },
//   // ... más castings
// ];

// const applications = [
//   {
//     id: 1,
//     castingId: 1,
//     role: "Actor principal",
//     name: "Juan Pérez",
//     date: "2023-07-15",
//     time: "14:30",
//   },
//   {
//     id: 2,
//     castingId: 1,
//     role: "Actriz principal",
//     name: "María García",
//     date: "2023-07-15",
//     time: "15:45",
//   },
//   {
//     id: 3,
//     castingId: 2,
//     role: "Modelo femenino",
//     name: "Laura Rodríguez",
//     date: "2023-07-16",
//     time: "10:15",
//   },
//   // ... más aplicaciones
// ];

export default function AgencyCastingsPage() {
  const [selectedApplication, setSelectedApplication] = useState(null);

  return (
    <div className="flex h-screen flex-col">
      <PageName name="Todos los Casting"></PageName>

      {/* Segunda columna: Tabla de castings */}
      <AllCastingList></AllCastingList>

      {/* Modal para detalles de aplicación */}
      <Dialog
        open={selectedApplication !== null}
        onOpenChange={() => setSelectedApplication(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalles de la Aplicación</DialogTitle>
          </DialogHeader>
          {selectedApplication && (
            <div>
              <p>
                <strong>Nombre:</strong> {selectedApplication.name}
              </p>
              <p>
                <strong>Rol:</strong> {selectedApplication.role}
              </p>
              <p>
                <strong>Fecha:</strong> {selectedApplication.date}
              </p>
              <p>
                <strong>Hora:</strong> {selectedApplication.time}
              </p>
              {/* Aquí puedes agregar más detalles de la aplicación */}
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSelectedApplication(null)}
            >
              Cerrar
            </Button>
            <Button variant="destructive">
              <X className="mr-2 h-4 w-4" /> Denegar
            </Button>
            <Button>
              <Check className="mr-2 h-4 w-4" /> Aprobar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
