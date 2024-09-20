/* eslint-disable no-unused-vars */
import { getStatusLabel } from "@/actions/utils/getStatusLabel";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check, Edit, Eye, List } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CastingApplicationForm } from "./CastingApplicationForm";
import { CastingApplicationsList } from "./CastingApplicationsList";
import { CastingDetails } from "./CastingDetails";
import { TableCell, TableRow } from "@/components/ui/table";
import { TrashIcon } from "@heroicons/react/24/outline";
import { deleteCasting } from "@/actions/admin/castingModule/delete-casting";
import { toast } from "sonner";

// function daysSince(date: Date): number {
//   const now = new Date();
//   const diffInMs = now.getTime() - date.getTime();
//   const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
//   return Math.floor(diffInDays);
// }

export const CastingItem = ({ casting, profile, permissions }) => {
  const [showCastingDetails, setShowCastingDetails] = useState(false);
  const [showApplyCasting, setShowApplyCasting] = useState(false);
  const [showCastingApplications, setShowCastingApplications] = useState(false);

  return (
    <>
      <>
        <TableRow key={casting.id}>
          <TableCell>{casting.name}</TableCell>
          <TableCell>{casting.id}</TableCell>

          <TableCell>{casting.aplications.length}</TableCell>
          <TableCell>{getStatusLabel(casting.status)}</TableCell>
          <TableCell>
            {(casting.dateEvent as Date).toLocaleDateString()}
          </TableCell>
          <TableCell>
            {(casting.dateLimitApplicants as Date).toLocaleDateString()}
          </TableCell>

          <TableCell>
            {profile?.type === "TALENT" && (
              <Button
                onClick={() => setShowApplyCasting(true)}
                variant="ghost"
                size="sm"
              >
                <Check className="h-4 w-4" />
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCastingDetails(true)}
            >
              <Eye className="h-4 w-4" />
            </Button>

            {permissions?.includes("agency:casting:admin") && (
              <Link
                href={`edit/${casting.id}`}
                className={buttonVariants({ size: "sm", variant: "ghost" })}
              >
                <Edit className="h-4 w-4" />
              </Link>
            )}

            {permissions?.includes("agency:casting:admin") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCastingApplications(true)}
              >
                <List className="h-4 w-4" />
              </Button>
            )}

            {permissions?.includes("agency:casting:admin") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={async () => {
                  toast("Estás seguro?", {
                    action: {
                      label: "Eliminar",
                      onClick: async () => {
                        await deleteCasting(casting.id);
                        toast.success("Eliminado correctamente");
                      },
                    },
                  });
                }}
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            )}
          </TableCell>
        </TableRow>

        {/* Modal para detalles del casting */}
        <Dialog open={showCastingDetails} onOpenChange={setShowCastingDetails}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Detalles del Casting</DialogTitle>
            </DialogHeader>
            {/* Aquí puedes agregar los detalles del casting */}
            <CastingDetails casting={casting}></CastingDetails>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowCastingDetails(false)}
              >
                Cerrar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Modal para aplicar al casting */}
        <Dialog open={showApplyCasting} onOpenChange={setShowApplyCasting}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Aplicar al Casting</DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowCastingDetails(false)}
              >
                Cerrar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Modal para mostrar aplicaciones al casting */}
        <Dialog
          open={showCastingApplications}
          onOpenChange={setShowCastingApplications}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Aplicaciones del Casting</DialogTitle>
            </DialogHeader>
            <CastingApplicationsList
              casting={casting}
            ></CastingApplicationsList>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowCastingDetails(false)}
              >
                Cerrar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    </>
  );
};
