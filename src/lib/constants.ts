export const constants = {
  multiTenant: true,
  tanantModelName: "Organization",
  appUrl:
    process.env.NODE_ENV === "production"
      ? "https://thesaasfactory.dev"
      : "https://localhost:3000",
  appName: "The SaaS Factory",
  appNameAbb: "TSF",
  logoUrl: "/assets/img/logo.webp",
  supportTel: "5541999568376",
  logoHUrl: "/assets/img/logoh.webp",
  logoDarkUrl: "/assets/img/logo-next-14-white.png",
  hotjarId: 3696840,
  appResume: "The Best Next 14 SaaS Boilerplate",
  demoMode: process.env.NEXT_PUBLIC_DEMO_MODE === "true",
  portalStripe: process.env.NEXT_PUBLIC_STRIPE_PORTAL,
  boilerplates: [
    {
      isPro: false,
      id: 1,
      name: "Next 14 FullStack SaaS Boilerplate",
      url: "/boilerplates/next-14-fullstack-saas-boilerplate",
      urlDemo: "https://next14.thesaasfactory.dev",
      urlDoc: "https://docs-next14.thesaasfactory.dev/",
      nameStack: "Clerk - Next 14 - TS - Prisma - Tailwind",
      githubName: "next-14-saas-boilerplate",
      description:
        "A complete boilerplate to quickly start projects with Next.js, TypeScript, and Tailwind CSS.",
      image: "/assets/img/boilerplates/free/cover.webp",
    },
    {
      isPro: true,
      id: 2,
      url: "/boilerplates/next-14-fullstack-saas-boilerplate-pro",
      urlDemo: "https://next14pro.thesaasfactory.dev/",
      urlDoc: "https://docs-next14-pro.thesaasfactory.dev/",
      nameStack: "Next Auth - Next 14 - TS - Prisma - Tailwind",
      name: "Next 14 FullStack SaaS Boilerplate PRO",
      githubName: "Next-14-SaaS-Boilerplate-Pro",
      description:
        "A complete boilerplate with superpowers to quickly start projects with Next.js, TypeScript, and Tailwind CSS.",
      image: "/assets/img/boilerplates/pro/1600x800.png",
    },
  ],
};

export const saasFeatures = {
  onboarding: true,
  telegramNotification: false,
};

export const sliderSettings = {
  dots: true,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  infinite: true,
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 4000,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
};

export const sliderSettingsTestimonials = {
  dots: true,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  infinite: true,
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 4000,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
