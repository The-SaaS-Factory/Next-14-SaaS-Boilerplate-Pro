export const constants = {
  multiTenant: true,
  appUrl: "https://monkeycasting.vercel.app",
  appName: "Monkey Casting",
  appNameAbb: "EC",
  logoUrl: "/assets/img/logo.webp",
  supportTel: "5541999568376",
  logoHUrl: "/assets/img/logoh.webp",
  logoDarkUrl: "/assets/img/logo-next-14-dark.png",
  hotjarId: 5098219,
  appResume:
    " Agencia de viajes especializada en la venta de boletos aéreos y paquetes turísticos personalizados. Ofrecemos servicios exclusivos para Cuba, además de la venta y envío de productos y mercancías hacia la isla",
  demoMode: process.env.NEXT_PUBLIC_DEMO_MODE === "true",
  portalStripe: process.env.NEXT_PUBLIC_STRIPE_PORTAL,
  weightExtraByPackage: 1,
  currencies: [
    {
      id: 3,
      name: "BRL",
      main: 0,
      code: "brl",
      rate: 5.25,
    },
    {
      id: 1,
      name: "USD",
      main: 1,
      code: "usd",
      rate: 1,
    },
  ],
  currencySymbols: {
    usd: "$",
    brl: "R$",
    gbp: "£",
    jpy: "¥",
    uyu: "UYU",
  },
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
