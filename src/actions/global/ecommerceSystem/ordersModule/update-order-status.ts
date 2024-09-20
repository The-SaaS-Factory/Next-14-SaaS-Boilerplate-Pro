"use server";
import prisma from "@/lib/db";
import { sendLoopsTransactionalEventToUser } from "@/utils/facades/serverFacades/loopsEmailMarketingFacade";
import { notifyToSuperAdmin } from "@/utils/facades/serverFacades/notificationFacade";
import { OrderStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
const EMAIL_ORDER_PAID = process.env.LOOPS_ORDER_PAID;
const EMAIL_ORDER_IN_DELIVERY = process.env.LOOPS_ORDER_INDELIVERY;
const EMAIL_ORDER_IN_COMPLETED = process.env.LOOPS_ORDER_COMPLETED;

export const updateOrderStatus = async ({
  orderId,
  status,
}: {
  orderId: number;
  status: OrderStatus;
}) => {
  const order = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status,
    },
    include: {
      user: true,
      contact: true,
    },
  });

  if (status === OrderStatus.IN_PROCESS) {
    sendLoopsTransactionalEventToUser({
      email: order.user.email,
      transactionalId: EMAIL_ORDER_PAID,
      dataVariables: {
        orderId: order.id,
        clientName: order.user.name,
      },
    });
    notifyToSuperAdmin("Una orden ha sido pagada: #" + order.id);
    revalidatePath("/home/admin/orders/pendings");
  }

  if (status === OrderStatus.IN_DELIVERY) {
    sendLoopsTransactionalEventToUser({
      email: order.user.email,
      transactionalId: EMAIL_ORDER_IN_DELIVERY,
      dataVariables: {
        orderId: order.id,
        clientName: order.user.name,
      },
    });
    notifyToSuperAdmin(
      "Una orden ha sido marcada como EN DELIVERY: #" + order.id
    );
    revalidatePath("/home/admin/orders/actives");
  }
  if (status === OrderStatus.COMPLETED) {
    if (order.contact && order.user) {
      sendLoopsTransactionalEventToUser({
        email: order.user.email,
        transactionalId: EMAIL_ORDER_IN_COMPLETED,
        dataVariables: {
          orderId: order.id,
          clientName: order.user.name,
          address: order.contact.address,
        },
      });
    }
    notifyToSuperAdmin(
      "Una orden ha sido marcada como completada: #" + order.id
    );
    revalidatePath("/home/admin/orders/completeds");
  }

  return order;
};
