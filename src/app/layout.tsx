import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { SectionProvider } from "@/components/ui/SectionProvider";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale} className="antialiased">
      <SectionProvider sections={[]}>
        <ClerkProvider afterSignUpUrl="/home" afterSignInUrl="/home">
          <body className={inter.className}>{children}</body>
          <Toaster richColors={true} position="top-center" />
        </ClerkProvider>
        <Analytics />
      </SectionProvider>
    </html>
  );
}
