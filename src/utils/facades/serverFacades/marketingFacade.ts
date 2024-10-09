import { updateMembership } from "./membershipFacade";
import { calculateMonthsFromDays } from "../frontendFacades/strFacade";
import { getSuperAdminSetting } from "./superAdminFacade";
import prisma from "@/lib/db";
import {
  sendLoopsTransactionalEventToUser,
  storeContactInLoopsAudience,
} from "./loopsEmailMarketingFacade";

export const checkMarketingActionsOnRegister = async (
  organizationId: number
) => {
  activateFreeTrial(organizationId);
  sendWelcomeEmail(organizationId);
  storeContactInEmailProvider(organizationId);
};

const storeContactInEmailProvider = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (user) {
    storeContactInLoopsAudience(
      user.email as string,
      user.name as string,
      "userRegistered"
    );
  }
};

const activateFreeTrial = async (organizationId: number) => {
  const freeTrial: string | null = await getSuperAdminSetting(
    "MARKETING_FREE_TRIAL"
  );

  if (freeTrial && freeTrial == "true") {
    const planTrial = await getSuperAdminSetting("MARKETING_FREE_TRIAL_PLAN");
    const days = await getSuperAdminSetting("MARKETING_FREE_DAYS");

    if (planTrial) {
      const plan = await prisma.plan.findUnique({
        where: {
          id: parseInt(planTrial),
        },
      });

      if (plan) {
        const months = calculateMonthsFromDays(days ? parseInt(days) : 14);
        updateMembership({
          organizationId,
          months,
          pricingId: null,
          currencyId: null,
          planId: plan.id,
        });
      } else {
        //send log
        //#Fix add module of logs/actions for super admin,
      }
    }
  }
};

export const sendWelcomeEmail = async (id: number) => {
  const loopActived: string | null = await getSuperAdminSetting(
    "LOOPS_ENABLED"
  );

  if (loopActived == "true") {
    const loopId: string | null = await getSuperAdminSetting("LOOPS_API_KEY");

    if (loopId) {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      //Check email for user
      const welcomeEmailForUserEnabled = await getSuperAdminSetting(
        "MARKETING_WELCOME_EMAIL_FOR_USERS_ENABLED"
      );

      const welcomeEmailForUser = await getSuperAdminSetting(
        "MARKETING_WELCOME_EMAIL_USER_TRANSACTIONALID"
      );

      if (
        welcomeEmailForUserEnabled === "true" &&
        user &&
        welcomeEmailForUser
      ) {
        const payload = {
          email: user.email as string,
          transactionalId: welcomeEmailForUser,
          dataVariables: {
            name: user.name,
          },
        };

        sendLoopsTransactionalEventToUser(payload);
      }
    }
  }
};
