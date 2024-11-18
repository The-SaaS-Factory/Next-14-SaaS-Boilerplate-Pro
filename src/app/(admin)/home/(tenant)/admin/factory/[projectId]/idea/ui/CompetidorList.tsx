"use client";

import { useState } from "react";
import { PlusCircle, X, ExternalLink, Info, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/components/ui/collapsible";
import { ProjectCompetitor } from "@prisma/client";

interface CompetitorListProps {
  competitors: ProjectCompetitor[];
  onAdd: (competitor: any) => void;
  onRemove: (id: string) => void;
  onUpdate: (competitor: ProjectCompetitor) => void;
}

export function CompetitorList({
  competitors,
  onAdd,
  onRemove,
  onUpdate,
}: CompetitorListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newNotes, setNewNotes] = useState("");

  const handleAdd = () => {
    if (newName.trim() && newUrl.trim()) {
      onAdd({
        id: Date.now().toString(),
        name: newName.trim(),
        url: newUrl.trim(),
        description: newNotes.trim(),
      });
      setNewName("");
      setNewUrl("");
      setNewNotes("");
      setIsOpen(false);
    }
  };

  return (
    <div className="space-y-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleContent className="space-y-2">
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Company name..."
            className="flex-1"
          />
          <Input
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="Website URL..."
            className="flex-1"
          />
          <Textarea
            value={newNotes}
            onChange={(e) => setNewNotes(e.target.value)}
            placeholder="Notes about competitor..."
            className="flex-1"
          />
        </CollapsibleContent>
        <CollapsibleTrigger asChild>
          <Button className="w-full" variant={isOpen ? "secondary" : "default"}>
            {isOpen ? (
              <>
                <ChevronUp className="mr-2 h-4 w-4" /> Cancel
              </>
            ) : (
              <>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Competitor
              </>
            )}
          </Button>
        </CollapsibleTrigger>
      </Collapsible>

      {isOpen && (
        <Button onClick={handleAdd} className="w-full">
          Save Competitor
        </Button>
      )}

      <ul className="space-y-2">
        {competitors?.map((competitor) => (
          <li
            key={competitor.id}
            className="flex items-center justify-between rounded-lg border p-3"
          >
            <div className="flex items-center gap-2 flex-1">
              <span className="font-medium">{competitor.name}</span>
              <a
                href={competitor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Info className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{competitor.name}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Website</label>
                      <a
                        href={competitor.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-500 hover:text-blue-700"
                      >
                        {competitor.url}
                      </a>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Notes</label>
                      <Textarea
                        value={competitor.description}
                        onChange={(e) =>
                          onUpdate({
                            ...competitor,
                            description: e.target.value,
                          })
                        }
                        className="mt-1"
                      />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(competitor.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
