/* eslint-disable no-unused-vars */
"use client";
import { useState } from "react";
import { PlusCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

interface SwotItem {
  id: string;
  text: string;
}

interface SwotCategory {
  items: SwotItem[];
}

interface SwotData {
  strengths: SwotCategory;
  weaknesses: SwotCategory;
  opportunities: SwotCategory;
  threats: SwotCategory;
}

interface SwotSectionProps {
  data: SwotData;
  onUpdate: (newData: any) => void;
}

export function SwotSection({ data, onUpdate }: SwotSectionProps) {
  const [newItem, setNewItem] = useState("");

  const handleAddItem = (category: keyof SwotData) => {
    console.log(category);
    console.log(data);

    if (newItem.trim()) {
      const newData = { ...data };
      newData[category]?.items?.push({
        id: Date.now().toString(),
        text: newItem.trim(),
      });
      onUpdate(newData);
      setNewItem("");
    }
  };

  const handleRemoveItem = (category: keyof SwotData, id: string) => {
    const newData = { ...data };
    newData[category].items = newData[category].items.filter(
      (item) => item.id !== id,
    );
    onUpdate(newData);
  };

  

  const renderCategory = (category: keyof SwotData, title: string) => (
    <TabsContent value={category} className="mt-4">
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder={`Add new ${title.toLowerCase()}...`}
              className="flex-1"
              onKeyPress={(e) => e.key === "Enter" && handleAddItem(category)}
            />
            <Button onClick={() => handleAddItem(category)} size="sm">
              <PlusCircle className="h-4 w-4" />
            </Button>
          </div>
          <ul className="space-y-2">
            {data[category]?.items?.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between rounded-lg border p-2"
              >
                <span>{item.text}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveItem(category, item.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </TabsContent>
  );

  return (
    <Tabs defaultValue="strengths" className="w-full">
      <TabsList className="grid grid-cols-4 w-full">
        <TabsTrigger value="strengths">Strengths </TabsTrigger>
        <TabsTrigger value="weaknesses">Weaknesses</TabsTrigger>
        <TabsTrigger value="opportunities">Opportunities </TabsTrigger>
        <TabsTrigger value="threats">Threats </TabsTrigger>
      </TabsList>
      {renderCategory("strengths", "Strengths")}
      {renderCategory("weaknesses", "Weaknesses")}
      {renderCategory("opportunities", "Opportunities")}
      {renderCategory("threats", "Threats")}
    </Tabs>
  );
}
