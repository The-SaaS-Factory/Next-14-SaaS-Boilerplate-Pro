"use client";

import { useState } from "react";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Component() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Starter",
      monthlyPrice: 45,
      annualPrice: 432,
      features: [
        "Lorem ipsum dolor sit amet",
        "Consectetur adipiscing elit",
        "Sed do eiusmod tempor",
        "Ut labore et dolore magna",
        "Ut enim ad minim veniam",
      ],
    },
    {
      name: "Business",
      monthlyPrice: 95,
      annualPrice: 912,
      features: [
        "Quis nostrud exercitation",
        "Duis aute irure dolor",
        "Excepteur sint occaecat",
        "Cupidatat non proident",
        "Sunt in culpa qui officia",
        "Deserunt mollit anim id est",
      ],
    },
    {
      name: "Enterprise",
      price: "Let's talk..",
      features: [
        "Laboris nisi ut aliquip",
        "Ex ea commodo consequat",
        "Duis aute irure dolor",
        "Excepteur sint occaecat",
        "Cupidatat non proident",
      ],
    },
  ];

  return (
    <div className="w-full px-4 py-8" id="prices">
      <div className="mx-auto mb-10 max-w-md text-center">
        <h2 className="mb-2 text-2xl font-bold">Simple, transparent pricing</h2>
        <p className="text-muted-foreground">
          Our straightforward and customizable plans ensure you get precisely
          what you need.
        </p>
      </div>

      <div className="mb-8 flex justify-center">
        <div className="bg-secondary inline-flex items-center rounded-full p-1">
          <Button
            variant={isAnnual ? "default" : "ghost"}
            className="relative rounded-full px-4"
            onClick={() => setIsAnnual(true)}
          >
            Annual
            {isAnnual && (
              <span className="bg-primary text-primary-foreground absolute -right-2 -top-2 rounded-full px-2 py-0.5 text-xs">
                Save 20%
              </span>
            )}
          </Button>
          <Button
            variant={!isAnnual ? "default" : "ghost"}
            className="rounded-full px-4"
            onClick={() => setIsAnnual(false)}
          >
            Monthly
          </Button>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
        {plans.map((plan, index) => (
          <Card
            key={plan.name}
            className={`relative ${index === 1 ? "bg-primary text-primary-foreground" : ""}`}
          >
            <CardHeader>
              <CardTitle className="text-lg">{plan.name}</CardTitle>
              <div className="mt-4 flex items-baseline text-3xl font-bold">
                {plan.price ? (
                  plan.price
                ) : (
                  <>
                    ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    <span className="text-muted-foreground ml-1 text-sm font-medium">
                      /{isAnnual ? "year" : "month"}
                    </span>
                  </>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <Button
                className="mb-6 w-full"
                variant={index === 1 ? "secondary" : "outline"}
              >
                {plan.name === "Enterprise" ? "Contact us" : "Choose this plan"}
              </Button>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex">
                    <Check
                      className={`mr-2 h-5 w-5 shrink-0 ${index === 1 ? "text-primary-foreground" : "text-primary"}`}
                    />
                    <span
                      className={`text-sm ${index === 1 ? "text-primary-foreground/90" : "text-muted-foreground"}`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
