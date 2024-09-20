import { getCastingApplications } from "@/actions/admin/castingModule/get-casting-details";
import { Casting } from "@prisma/client";
import { useEffect, useState } from "react";

export const CastingApplicationsList = ({ casting }: { casting: Casting }) => {
  const [applications, setApplications] = useState<any[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const info = await getCastingApplications(casting.id);

      setApplications(info);
    };

    fetchData();
  }, [casting.id]);

  return (
    <div className="flex flex-col gap-2 overflow-y-hidden">
      <div className="flex flex-col gap-2 overflow-y-auto">
        {applications?.map((item) => (
          <div className="rounded border p-4" key={`applications-${item.id}`}>
            <p>
              <span className="font-medium">Nombre: </span>
              {item.profile.name}
            </p>
            <p>
              <span className="font-medium">Correo: </span>
              {item.profile.email}
            </p>
            <p>
              <span className="font-medium">Rol: </span>
              {item.role.name}
            </p>
          </div>
        ))}

        {applications?.length === 0 && (
          <p className="text-center text-neutral-400 my-5">
            No hay aplicaciones para este casting
          </p>
        )}
      </div>
    </div>
  );
};
