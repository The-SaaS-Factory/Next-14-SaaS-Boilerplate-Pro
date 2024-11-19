"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { toast } from "sonner";

export const GlobalProjectAction = () => {
  const handleAction = () => {
    toast.info("Action not implemented yet");
  };
  return (
    <div className="  flex lg:mr-4 lg:mt-0">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="secondary">
            <Settings aria-hidden="true" className="  size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Project Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleAction}>
            Change Templates
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleAction}>
            Change Status
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
