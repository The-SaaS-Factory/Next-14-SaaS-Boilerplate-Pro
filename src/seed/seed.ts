 
// import { paymentsMethods } from "./seeds/pricing";
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
  prisma.$transaction(async ( ) => {
    // await tx.permission.createMany({
    //   data: permissions,
    // });
    // await tx.superAdminSetting.createMany({
    //   data: settings,
    // });
    // await tx.adminCurrencies.createMany({
    //   data: currencies,
    // });
    // await tx.module.createMany({
    //   data: modules,
    // });
  });
  // await tx.adminCurrencies.createMany({
  //   data: currencies,
  // });
  // await tx.capabilitie.createMany({
  //   data: capabilities,
  // });
  // await tx.superAdminSetting.createMany({
  //   data: settings,
  // });
  // await tx.paymentMethod.createMany({
  //   data: paymentsMethods,
  // });
  // });
  // console.log("Seeds disableds");
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
