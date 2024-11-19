"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { Textarea } from "@/app/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface EditablesettingProps {
  setting: string;
  onUpdate: (setting: string) => void;
}

export function EditableSetting({ setting, onUpdate }: EditablesettingProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(setting);

  const handleSave = () => {
    onUpdate(value);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="space-y-2">
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="min-h-[100px]"
        />
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative rounded-lg border p-4">
      <Button
        variant="ghost"
        size="sm"
        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => setIsEditing(true)}
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <p className="text-gray-600 pr-8">{setting}</p>
    </div>
  );
}