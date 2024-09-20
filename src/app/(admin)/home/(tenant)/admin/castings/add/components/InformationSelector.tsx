/* eslint-disable no-unused-vars */
import { insertCastingInformation } from "@/actions/admin/castingModule/insert-casting-information";
import { getUserCastingInformations } from "@/actions/admin/castingModule/get-user-castings-informations";
import { CastingInformations, CastingInformationType } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface InformationSelectorProps {
  informations: CastingInformations[];
  setSelectedInformations: (informations: CastingInformations[]) => void;
}

export const InformationSelector: React.FC<InformationSelectorProps> = ({
  informations,
  setSelectedInformations,
}) => {
  const [name, setName] = useState("");
  const [type, setType] = useState<CastingInformationType>(
    CastingInformationType.TEXT
  );
  const [_informations, setLocalInformations] = useState<
    CastingInformations[] | null
  >(null);

  const handleAggregate = async () => {
    try {
      await insertCastingInformation(name, type);
      toast.success("Information added successfully");
      setName("");
      setType(CastingInformationType.TEXT);
      await fetchData(); // Refresh data after adding new information
    } catch (err) {
      toast.error("Failed to add information");
    }
  };

  const fetchData = async () => {
    const castingsInfo = await getUserCastingInformations();
    setLocalInformations(castingsInfo); // Update local state
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelect = (info: CastingInformations) => {
    const isSelected = informations.some((item) => item.id === info.id);
    let updatedSelections;

    if (isSelected) {
      updatedSelections = informations.filter((item) => item.id !== info.id);
    } else {
      updatedSelections = [...informations, info];
    }

    setSelectedInformations?.(updatedSelections); // Update parent component state with selected items
  };

  return (
    <div className="p-4 mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">
        Información Adicional para aplicar al casting
      </h2>

      {_informations?.map((item) => (
        <div
          key={item.id}
          className="flex items-center mb-2 p-3 bg-gray-100 rounded-md shadow-sm"
        >
          <input
            type="checkbox"
            checked={informations?.some((info) => info.id === item.id)}
            onChange={() => handleSelect(item)}
            className="mr-2"
          />
          <div>
            <p className="text-gray-800 font-semibold">{item.name}</p>
            <p className="text-gray-600 text-sm">{item.type}</p>
          </div>
        </div>
      ))}

      <div className="mt-6 space-y-4 flex md:flex-row flex-col gap-2 items-center">
        <p>Añadir Información</p>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="md:w-1/3 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value as CastingInformationType)}
          className="md:w-28 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {Object.values(CastingInformationType).map((infoType) => (
            <option key={infoType} value={infoType}>
              {infoType}
            </option>
          ))}
        </select>

        <button
          disabled={!name || name === "" || !type}
          type="button"
          onClick={handleAggregate}
          className="md:w-fit whitespace-nowrap w-full bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 transition-colors disabled:bg-neutral-400 disabled:cursor-not-allowed"
        >
          Nueva Información
        </button>
      </div>
    </div>
  );
};
