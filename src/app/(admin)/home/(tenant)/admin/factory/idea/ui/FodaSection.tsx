"use client";

import { useState } from "react";
import { PlusCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

interface FodaItem {
  id: string;
  text: string;
}

interface FodaCategory {
  items: FodaItem[];
}

interface FodaData {
  fortalezas: FodaCategory;
  debilidades: FodaCategory;
  oportunidades: FodaCategory;
  amenazas: FodaCategory;
}

interface FodaSectionProps {
  data: FodaData;
  onUpdate: (newData: FodaData) => void;
}

export function FodaSection({ data, onUpdate }: FodaSectionProps) {
  const [newItem, setNewItem] = useState("");

  const handleAddItem = (category: keyof FodaData) => {
    if (newItem.trim()) {
      const newData = { ...data };
      newData[category].items.push({
        id: Date.now().toString(),
        text: newItem.trim(),
      });
      onUpdate(newData);
      setNewItem("");
    }
  };

  const handleRemoveItem = (category: keyof FodaData, id: string) => {
    const newData = { ...data };
    newData[category].items = newData[category].items.filter(item => item.id !== id);
    onUpdate(newData);
  };

  const renderCategory = (category: keyof FodaData, title: string) => (
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
            {data[category].items.map((item) => (
              <li key={item.id} className="flex items-center justify-between rounded-lg border p-2">
                <span>{item.text}</span>
                <Button variant="ghost" size="sm" onClick={() => handleRemoveItem(category, item.id)}>
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
    <Tabs defaultValue="fortalezas" className="w-full">
      <TabsList className="grid grid-cols-4 w-full">
        <TabsTrigger value="fortalezas">Fortalezas</TabsTrigger>
        <TabsTrigger value="debilidades">Debilidades</TabsTrigger>
        <TabsTrigger value="oportunidades">Oportunidades</TabsTrigger>
        <TabsTrigger value="amenazas">Amenazas</TabsTrigger>
      </TabsList>
      {renderCategory("fortalezas", "Fortalezas")}
      {renderCategory("debilidades", "Debilidades")}
      {renderCategory("oportunidades", "Oportunidades")}
      {renderCategory("amenazas", "Amenazas")}
    </Tabs>
  );
}