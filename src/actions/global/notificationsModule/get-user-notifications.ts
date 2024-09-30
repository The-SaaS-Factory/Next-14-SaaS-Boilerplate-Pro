"use server";

import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";

export const getUserNotifications = async ({
  args,
}: {
  args: {
    limit: number;
    offset: number;
    search: string;
    userFromAdminId?: number;
  };
}) => {
  const limit = args.limit;
  const offset = args.offset;

  const { id } = await getMembership();
  const data = await prisma.notification.findMany({
    where: {
      organizationId: id,
    },
    skip: offset,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });

  //Update all notifications to viewed
  await prisma.notification.updateMany({
    where: {
      organizationId: id,
      viewed: false,
    },
    data: {
      viewed: true,
    },
  });

  const totalCount = await prisma.notification.count({
    where: {
      organizationId: id,
    },
  });

  const totalPages = Math.ceil(totalCount / limit);

  return { data, totalCount, totalPages };
};

export const getUserNotificationsUnreadCount = async () => {
  const { id } = await getMembership();
  return await prisma.notification.count({
    where: {
      organizationId: id,
      viewed: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
