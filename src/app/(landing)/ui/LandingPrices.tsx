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
    <div className="w-full px-4 py-8 " id="prices">
      <div className="mx-auto max-w-md text-center mb-10">
        <h2 className="text-2xl font-bold mb-2">Simple, transparent pricing</h2>
        <p className="text-muted-foreground">
          Our straightforward and customizable plans ensure you get precisely
          what you need.
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center bg-secondary rounded-full p-1">
          <Button
            variant={isAnnual ? "default" : "ghost"}
            className="relative rounded-full px-4"
            onClick={() => setIsAnnual(true)}
          >
            Annual
            {isAnnual && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
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

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
                    <span className="ml-1 text-sm font-medium text-muted-foreground">
                      /{isAnnual ? "year" : "month"}
                    </span>
                  </>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full mb-6"
                variant={index === 1 ? "secondary" : "outline"}
              >
                {plan.name === "Enterprise" ? "Contact us" : "Choose this plan"}
              </Button>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex">
                    <Check
                      className={`h-5 w-5 shrink-0 mr-2 ${index === 1 ? "text-primary-foreground" : "text-primary"}`}
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
