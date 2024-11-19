"use client";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

interface TabItem {
  value: string;
  label: string;
  content: React.ReactNode;
}

interface TabCardProps {
  title: string;
  tabs: TabItem[];
}

export function TabCard({ title, tabs }: TabCardProps) {
  return (
    <Card className="p-6">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">{title}</h2>
      <Tabs defaultValue={tabs[0].value} className="w-full">
        <TabsList className="w-full">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="flex-1">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-4">
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
}
