import { PrismaClient } from "@prisma/client";
import { agencyPermissions, permissions } from "./seeds/permissions";

const prisma = new PrismaClient();

async function main() {
  prisma.$transaction(async (tx: any) => {
    await tx.permission.deleteMany();

    await tx.permission.createMany({
      data: permissions,
    });
    await tx.permission.createMany({
      data: agencyPermissions,
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
