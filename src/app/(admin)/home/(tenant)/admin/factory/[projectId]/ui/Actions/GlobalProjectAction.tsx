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

export const GlobalProjectAction = () => {
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
          <DropdownMenuItem>Change Templates</DropdownMenuItem>
          <DropdownMenuItem>Change Status</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
