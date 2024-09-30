"use server";

import prisma from "@/lib/db";

export const getAllShippingZonesByProfileId = async (
  organizationId,
  cityZone,
  state,
  country
) => {
  const resultByCity = await prisma.profileShippingZone.findMany({
    where: {
      organizationId: organizationId,
      city: cityZone,
    },
    include: {
      currency: true,
    },
  });

  const resultByState = await prisma.profileShippingZone.findMany({
    where: {
      organizationId: organizationId,
      state: state,
      city: null,
    },
    include: {
      currency: true,
    },
  });

  const resultByCountry = await prisma.profileShippingZone.findMany({
    where: {
      organizationId: organizationId,
      country: country,
      state: null,
      city: null,
    },
    include: {
      currency: true,
    },
  });

  // Combinar todos los resultados
  const allResults = [...resultByCity, ...resultByState, ...resultByCountry];

  // Filtrar y obtener el más barato por cada tipo
  const uniqueShippingZones = [];
  const typeMap = new Map();

  allResults.forEach((zone) => {
    if (!typeMap.has(zone.type) || zone.price < typeMap.get(zone.type).price) {
      typeMap.set(zone.type, zone);
    }
  });

  // Convertir Map a array de resultados únicos
  typeMap.forEach((zone) => uniqueShippingZones.push(zone));

  return uniqueShippingZones;
};
