/* eslint-disable no-unused-vars */
import { getCastingRoles } from "@/actions/admin/castingModule/get-casting-role-details";
import { insertCastingRole } from "@/actions/admin/castingModule/insert-casting-role";
import { CastingRoles } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface RoleSelectorProps {
  roles: CastingRoles[];
  setSelectedRoles: (roles: CastingRoles[]) => void;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({
  roles,
  setSelectedRoles,
}) => {
  const [name, setName] = useState("");

  const [_roles, setRoles] = useState<CastingRoles[] | null>(null);

  const handleAggregate = async () => {
    try {
      await insertCastingRole(name);
      toast.success("Role added successfully");
      setName("");
      await fetchData();
    } catch (err) {
      toast.error("Failed to add role");
    }
  };

  const fetchData = async () => {
    const castingsInfo = await getCastingRoles();
    setRoles(castingsInfo);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelect = (role: CastingRoles) => {
    const isSelected = roles?.some((item) => item.id === role.id);
    let updatedSelections;

    if (isSelected) {
      updatedSelections = roles?.filter((item) => item.id !== role.id);
    } else {
      updatedSelections = [...roles!, role];
    }

    setSelectedRoles(updatedSelections);
  };

  return (
    <div className="p-4 mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Roles Disponibles</h2>

      {_roles?.map((item) => (
        <div
          key={item.id}
          className="flex items-center mb-2 p-3 bg-gray-100 rounded-md shadow-sm"
        >
          <input
            type="checkbox"
            checked={roles?.some((info) => info.id === item.id)}
            onChange={() => handleSelect(item)}
            className="mr-2"
          />
          <div>
            <p className="text-gray-800 font-semibold">{item.name}</p>
          </div>
        </div>
      ))}

      <div className="mt-6 flex md:flex-row flex-col gap-2 items-center justify-center">
        <p>Añadir Rol</p>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-1/3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          disabled={!name}
          type="button"
          onClick={handleAggregate}
          className="w-full max-w-24 bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 transition-colors disabled:bg-neutral-400 disabled:cursor-not-allowed"
        >
          Nueva Rol
        </button>
      </div>
    </div>
  );
};
