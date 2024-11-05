import { PrismaClient } from "@prisma/client";
import { organizationPermissions, permissions } from "./seeds/permissions";
import { settings } from "./seeds/platform";
import { currencies } from "./seeds/currenciess";
import { paymentsMethods } from "./seeds/pricing";
import { capabilities, planCapabilities, plans, pricing } from "./seeds/plans";

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction(async (tx: PrismaClient) => {
    await tx.permission.deleteMany();
    await tx.pricing.deleteMany();
    await tx.planCapabilities.deleteMany();
    await tx.adminCurrencies.deleteMany();
    await tx.paymentMethod.deleteMany();
    await tx.plan.deleteMany();
    await tx.capability.deleteMany();
    await tx.superAdminSetting.deleteMany();
  });
  await prisma.$transaction(async (tx2: PrismaClient) => {
    await tx2.plan.createMany({
      data: plans,
    });
    await tx2.capability.createMany({
      data: capabilities,
    });
    await tx2.pricing.createMany({
      data: pricing,
    });
    await tx2.paymentMethod.createMany({
      data: paymentsMethods,
    });
    await tx2.adminCurrencies.createMany({
      data: currencies,
    });
    await tx2.superAdminSetting.createMany({
      data: settings,
    });
    await tx2.permission.createMany({
      data: permissions,
    });
    await tx2.permission.createMany({
      data: organizationPermissions,
    });
    await tx2.planCapabilities.createMany({
      data: planCapabilities,
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
