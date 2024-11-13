export const constants = {
  multiTenant: true,
  tanantModelName: "Organization",
  appUrl:
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NODE_ENV === "production"
      ? "https://changeThisUrlIfYouAreNotUsingVercel.com"
      : "http://localhost:3000",
  appName: "Boilerplate Pro",
  appNameAbb: "EC",
  logoUrl: "/assets/img/logo-next-14.jpg",
  supportTel: "5541999568376",
  logoHUrl: "/assets/img/logoh.webp",
  logoDarkUrl: "/assets/img/logo-next-14-white.png",
  hotjarId: 777,
  appResume: "The Best Next 14 SaaS Boilerplate",
  demoMode: process.env.NEXT_PUBLIC_DEMO_MODE === "true",
  portalStripe: process.env.NEXT_PUBLIC_STRIPE_PORTAL,
};

export const saasFeatures = {
  onboarding: true,
  telegramNotification: true,
  blogMdx: true,
};
