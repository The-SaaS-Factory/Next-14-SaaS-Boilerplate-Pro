import { CastingStatus } from "@prisma/client";

export const getStatusLabel = (status: CastingStatus) => {
    if (status === "IN_PROGRESS") return "En Progreso"
    if (status === "COMPLETED") return "Completado"
    if (status === "DRAFT") return "Borrador"
    if (status === "INACTIVE") return "Inactivo"
    if (status === "PENDING") return "Pendiente"
    if (status === "OPEN") return "Abierto"

}