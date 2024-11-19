/* eslint-disable no-unused-vars */
"use client";
import { useState } from "react";
import { PlusCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EditableListProps {
  items: string[];
  onAdd: (item: string) => void;
  onRemove: (index: number) => void;
}

export function EditableList({ items, onAdd, onRemove }: EditableListProps) {
  const [newItem, setNewItem] = useState("");

  const handleAdd = () => {
    if (newItem.trim()) {
      onAdd(newItem.trim());
      setNewItem("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item..."
          className="flex-1"
          onKeyPress={(e) => e.key === "Enter" && handleAdd()}
        />
        <Button onClick={handleAdd} size="sm">
          <PlusCircle className="h-4 w-4" />
        </Button>
      </div>
      <ul className="space-y-2">
        {items?.map((item, index) => (
          <li key={index} className="flex items-center justify-between rounded-lg border p-2">
            <span>{item}</span>
            <Button variant="ghost" size="sm" onClick={() => onRemove(index)}>
              <X className="h-4 w-4" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}