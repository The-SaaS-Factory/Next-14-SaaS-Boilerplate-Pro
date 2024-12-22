/* eslint-disable no-unused-vars */
"use client";

import { ReactNode, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  open?: boolean;
  setOpen?: (value: boolean) => void;
  buttonClassName?: string;
  activateUrl?: string;
  children?: ReactNode;
  icon?: ReactNode;
  label?: string;
  style?: "link" | "button";
  size?: "max" | "fit";
  dialogTitle?: string;
  showCloseButton?: boolean;
}

export const CustomDialog = ({
  open: controlledOpen,
  setOpen: controlledSetOpen,
  activateUrl,
  buttonClassName,
  label,
  children,
  icon,
  style = "link",
  dialogTitle,
  showCloseButton = true,
}: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [internalOpen, setInternalOpen] = useState(controlledOpen ?? false);

  // Sync internal state with external state
  useEffect(() => {
    if (typeof controlledOpen === "boolean") {
      setInternalOpen(controlledOpen);
    }
  }, [controlledOpen]);

  // Handle URL activation logic
  useEffect(() => {
    if (activateUrl) {
      if (searchParams.get(activateUrl) !== null) {
        setInternalOpen(true);
      } else {
        setInternalOpen(false);
      }
    }
  }, [searchParams, activateUrl]);

  const handleOpen = () => {
    setInternalOpen(true);
    controlledSetOpen?.(true);
  };

  const handleClose = () => {
    setInternalOpen(false);
    controlledSetOpen?.(false);
    if (activateUrl && searchParams.get(activateUrl) !== null) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(activateUrl);
      router.replace(`${window.location.pathname}?${params.toString()}`, {
        scroll: false,
      });
    }
  };

  return (
    <>
      {buttonClassName ? (
        <button className={buttonClassName} onClick={handleOpen}>
          {icon}
          {label ?? "Open Dialog"}
        </button>
      ) : (
        <button
          className={`${
            style === "link" ? "text-link" : "btn-main"
          } flex items-center gap-2`}
          onClick={handleOpen}
        >
          {icon}
          {label ?? "Open Dialog"}
        </button>
      )}

      <Dialog open={internalOpen} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
          </DialogHeader>

          <div className="flex max-h-96 flex-col overflow-y-auto">
            {children}
          </div>

          <DialogFooter>
            {showCloseButton && (
              <Button variant="outline" onClick={handleClose}>
                Close
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
