import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function CustomCTAService() {
  return (
    <section className="w-full z-10 py-12 md:py-24 lg:py-32 bg-gradient-to-r from-indigo-600 via-violet-700 to-violet-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
              The SaaS Factory Custom SaaS Development Service
            </h2>
            <p className="  text-zinc-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-100">
              Take advantage of our experience as creators of a popular SaaS
              boilerplate to build your perfect SaaS solution
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Our Unique Advantages</CardTitle>
              <CardDescription>
                What sets us apart in custom development
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center gap-4">
                <CheckCircle className="h-5 w-5 text-primary" />
                <div className="font-medium">Creators of SaaS Boilerplate</div>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle className="h-5 w-5 text-primary" />
                <div className="font-medium">
                  Rapid Development & Deployment
                </div>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle className="h-5 w-5 text-primary" />
                <div className="font-medium">
                  Deep Expertise in SaaS Architecture
                </div>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle className="h-5 w-5 text-primary" />
                <div className="font-medium">
                  Tailored Solutions for Your Needs
                </div>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle className="h-5 w-5 text-primary" />
                <div className="font-medium">Ongoing Support & Maintenance</div>
              </div>
            </CardContent>
          </Card>
          <div className="flex flex-col justify-center space-y-4">
            <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl text-white">
              Ready to Build Your Dream Solution?
            </h3>
            <p className="text-zinc-200 md:text-xl/relaxed">
              Our team of expert developers is ready to make your vision a
              reality. Us combine our deep knowledge of SaaS architecture with
              customization development to create solutions that perfectly fit
              your business needs.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/home/admin/services">
                <Button className="bg-white text-primary hover:bg-zinc-100">
                  Talk wit us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
