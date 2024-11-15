"use client";

import { useState } from "react";
import {
  PlusCircle,
  X,
  ChevronRight,
  ChevronDown,
  GripVertical,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/components/ui/collapsible";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { toast } from "sonner";

interface SubFeature {
  id: string;
  text: string;
}

interface Feature {
  id: string;
  text: string;
  subFeatures: SubFeature[];
}

interface FeatureListProps {
  features: Feature[];
  onAdd: (feature: Feature) => void;
  onUpdate: (feature: Feature) => void;
  onRemove: (id: string) => void;
  onReorder: (features: Feature[]) => void;
}

export function FeatureList({
  features,
  onAdd,
  onUpdate,
  onRemove,
  onReorder,
}: FeatureListProps) {
  const [newFeature, setNewFeature] = useState("");
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null);
  const [editingSubFeature, setEditingSubFeature] = useState<SubFeature | null>(
    null,
  );
  const [newSubFeature, setNewSubFeature] = useState("");

  const handleAdd = () => {
    if (newFeature.trim()) {
      onAdd({
        id: Date.now().toString(),
        text: newFeature.trim(),
        subFeatures: [],
      });
      setNewFeature("");
    }
  };

  const handleAddSubFeature = (feature: Feature) => {
    if (newSubFeature.trim()) {
      const updatedFeature = {
        ...feature,
        subFeatures: [
          ...feature.subFeatures,
          { id: Date.now().toString(), text: newSubFeature.trim() },
        ],
      };
      onUpdate(updatedFeature);
      setNewSubFeature("");
    }
  };

  const handleRemoveSubFeature = (feature: Feature, subFeatureId: string) => {
    const updatedFeature = {
      ...feature,
      subFeatures: feature.subFeatures.filter((sf) => sf.id !== subFeatureId),
    };
    onUpdate(updatedFeature);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(features);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onReorder(items);
  };

  const hadnleUpdateSubFeature = (subFeature: SubFeature) => {
    if (!editingFeature) return;

    const updatedFeature = {
      ...editingFeature,
      subFeatures: editingFeature.subFeatures.map((sf) =>
        sf.id === subFeature.id ? subFeature : sf,
      ),
    };

    onUpdate(updatedFeature);
    toast.success("Sub-feature updated successfully");
    //  setEditingSubFeature(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={newFeature}
          onChange={(e) => setNewFeature(e.target.value)}
          placeholder="Add new feature..."
          className="flex-1"
          onKeyPress={(e) => e.key === "Enter" && handleAdd()}
        />
        <Button onClick={handleAdd} size="sm">
          <PlusCircle className="h-4 w-4" />
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="features">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              {features?.map((feature, index) => (
                <Draggable
                  key={feature.id}
                  draggableId={feature.id}
                  index={index}
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="rounded-lg border p-2"
                    >
                      <div className="flex items-center gap-2">
                        <div {...provided.dragHandleProps}>
                          <GripVertical className="h-4 w-4 text-gray-400" />
                        </div>
                        <Collapsible className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{feature.text}</span>
                            <div className="flex items-center gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Pencil className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Edit Feature</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <Input
                                      value={
                                        editingFeature?.text || feature.text
                                      }
                                      onChange={(e) =>
                                        setEditingFeature({
                                          ...feature,
                                          text: e.target.value,
                                        })
                                      }
                                    />
                                    <Button
                                      onClick={() => {
                                        if (editingFeature) {
                                          onUpdate(editingFeature);
                                          setEditingFeature(null);
                                          toast.success(
                                            "Feature updated successfully",
                                          );
                                        }
                                      }}
                                    >
                                      Save
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                              <CollapsibleTrigger>
                                <Button variant="ghost" size="sm">
                                  <ChevronRight className="h-4 w-4" />
                                </Button>
                              </CollapsibleTrigger>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onRemove(feature.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <CollapsibleContent className="mt-2 space-y-2">
                            <div className="flex gap-2">
                              <Input
                                value={newSubFeature}
                                onChange={(e) =>
                                  setNewSubFeature(e.target.value)
                                }
                                placeholder="Add sub-feature..."
                                className="flex-1"
                                onKeyPress={(e) =>
                                  e.key === "Enter" &&
                                  handleAddSubFeature(feature)
                                }
                              />
                              <Button
                                onClick={() => handleAddSubFeature(feature)}
                                size="sm"
                              >
                                <PlusCircle className="h-4 w-4" />
                              </Button>
                            </div>
                            <ul className="space-y-1 pl-4">
                              {feature.subFeatures.map((subFeature) => (
                                <li
                                  key={subFeature.id}
                                  className="flex items-center justify-between rounded border p-2"
                                >
                                  <span>{subFeature.text}</span>
                                  <div className="flex items-center gap-2">
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => {
                                            setEditingFeature(feature); // Asigna la característica principal
                                            setEditingSubFeature(subFeature); // Asigna la subcaracterística
                                          }}
                                        >
                                          <Pencil className="h-4 w-4" />
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent>
                                        <DialogHeader>
                                          <DialogTitle>
                                            Edit Sub-Feature
                                          </DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-4">
                                          <Input
                                            value={
                                              editingSubFeature?.text || ""
                                            }
                                            onChange={(e) =>
                                              setEditingSubFeature({
                                                ...editingSubFeature!,
                                                text: e.target.value,
                                              })
                                            }
                                          />
                                          <Button
                                            onClick={() => {
                                              if (editingSubFeature) {
                                                hadnleUpdateSubFeature(
                                                  editingSubFeature,
                                                );
                                              }
                                            }}
                                          >
                                            Save
                                          </Button>
                                        </div>
                                      </DialogContent>
                                    </Dialog>

                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() =>
                                        handleRemoveSubFeature(
                                          feature,
                                          subFeature.id,
                                        )
                                      }
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </CollapsibleContent>
                        </Collapsible>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
