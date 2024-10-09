import { PrismaClient } from "@prisma/client";
import { organizationPermissions, permissions } from "./seeds/permissions";
import { settings } from "./seeds/platform";
import { currencies } from "./seeds/currenciess";
import { paymentsMethods } from "./seeds/pricing";
import { capabilities, planCapabilities, plans } from "./seeds/plans";

const prisma = new PrismaClient();

async function main() {
  prisma.$transaction(async (tx: PrismaClient) => {
    await tx.permission.deleteMany();
    await tx.adminCurrencies.deleteMany();
    await tx.paymentMethod.deleteMany();
    await tx.plan.deleteMany();
    await tx.capability.deleteMany();
    await tx.planCapabilities.deleteMany();
    await tx.superAdminSetting.deleteMany();
    await tx.plan.createMany({
      data: plans,
    });
    await tx.capability.createMany({
      data: capabilities,
    });
    await tx.paymentMethod.createMany({
      data: paymentsMethods,
    });
    await tx.adminCurrencies.createMany({
      data: currencies,
    });
    await tx.superAdminSetting.createMany({
      data: settings,
    });
    await tx.permission.createMany({
      data: permissions,
    });
    await tx.permission.createMany({
      data: organizationPermissions,
    });
    await tx.planCapabilities.createMany({
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
