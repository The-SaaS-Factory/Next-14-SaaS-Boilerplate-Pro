"use client";

import { useState } from "react";
import { PlusCircle, X, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

interface Plan {
  id: string;
  name: string;
  capabilities: string[];
}

interface BusinessModelProps {
  plans: Plan[];
  capabilities: string[];
  onAddPlan: (plan: Plan) => void;
  onUpdatePlan: (plan: Plan) => void;
  onRemovePlan: (id: string) => void;
  onAddCapability: (capability: string) => void;
  onRemoveCapability: (index: number) => void;
}

export function BusinessModelSection({
  plans,
  capabilities,
  onAddPlan,
  onUpdatePlan,
  onRemovePlan,
  onAddCapability,
  onRemoveCapability,
}: BusinessModelProps) {
  const [newPlan, setNewPlan] = useState("");
  const [newCapability, setNewCapability] = useState("");
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);

  const handleAddPlan = () => {
    if (newPlan.trim()) {
      onAddPlan({
        id: Date.now().toString(),
        name: newPlan.trim(),
        capabilities: [],
      });
      setNewPlan("");
    }
  };

  const handleAddCapability = () => {
    if (newCapability.trim()) {
      onAddCapability(newCapability.trim());
      setNewCapability("");
    }
  };

  const toggleCapability = (plan: Plan, capability: string) => {
    const updatedCapabilities = plan.capabilities.includes(capability)
      ? plan.capabilities.filter((c) => c !== capability)
      : [...plan.capabilities, capability];

    onUpdatePlan({
      ...plan,
      capabilities: updatedCapabilities,
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Plans</h3>
        <div className="flex gap-2">
          <Input
            value={newPlan}
            onChange={(e) => setNewPlan(e.target.value)}
            placeholder="Add new plan..."
            className="flex-1"
            onKeyPress={(e) => e.key === "Enter" && handleAddPlan()}
          />
          <Button onClick={handleAddPlan} size="sm">
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
        <ul className="space-y-2">
          {plans.map((plan) => (
            <li key={plan.id} className="rounded-lg border p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{plan.name}</span>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Plan</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input
                          value={editingPlan?.name || plan.name}
                          onChange={(e) =>
                            setEditingPlan({
                              ...plan,
                              name: e.target.value,
                            })
                          }
                        />
                        <div className="space-y-2">
                          {capabilities.map((capability) => (
                            <div key={capability} className="flex items-center space-x-2">
                              <Checkbox
                                id={`${plan.id}-${capability}`}
                                checked={plan.capabilities.includes(capability)}
                                onCheckedChange={() => toggleCapability(plan, capability)}
                              />
                              <label htmlFor={`${plan.id}-${capability}`}>{capability}</label>
                            </div>
                          ))}
                        </div>
                        <Button
                          onClick={() => {
                            if (editingPlan) {
                              onUpdatePlan(editingPlan);
                              setEditingPlan(null);
                            }
                          }}
                        >
                          Save
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant="ghost" size="sm" onClick={() => onRemovePlan(plan.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="pl-4 text-sm text-gray-600">
                {plan.capabilities.length > 0 ? (
                  plan.capabilities.map((cap) => (
                    <span key={cap} className="mr-2">
                      • {cap}
                    </span>
                  ))
                ) : (
                  <span className="italic">No capabilities assigned</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Capabilities</h3>
        <div className="flex gap-2">
          <Input
            value={newCapability}
            onChange={(e) => setNewCapability(e.target.value)}
            placeholder="Add new capability..."
            className="flex-1"
            onKeyPress={(e) => e.key === "Enter" && handleAddCapability()}
          />
          <Button onClick={handleAddCapability} size="sm">
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
        <ul className="space-y-2">
          {capabilities.map((capability, index) => (
            <li key={index} className="flex items-center justify-between rounded-lg border p-2">
              <span>{capability}</span>
              <Button variant="ghost" size="sm" onClick={() => onRemoveCapability(index)}>
                <X className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}