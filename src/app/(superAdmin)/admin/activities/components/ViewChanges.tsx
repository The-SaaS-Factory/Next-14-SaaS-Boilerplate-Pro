import React from "react";

type Change = {
  before: any;
  after: any;
};

type ChangesProps = {
  changes: Record<string, Change>;
  type: string;
};

const ViewChanges: React.FC<ChangesProps> = ({ changes, type }) => {
  return (
    <div className="w-full max-w-4xl mx-auto  bg-white shadow-md rounded-lg">
      {Object.keys(changes).length === 0 ? (
        <p className="text-center text-gray-600">No se realizaron cambios.</p>
      ) : (
        <div className="space-y-4">
          {type === "CREATE" && (
            <>
              <div>
                <p className="font-bold mb-2">Casting Creado</p>

                <p className="text-sm text-neutral-700">
                  Nombre: {(changes.new as any).name}
                </p>

                <p className="text-sm text-neutral-700">
                  Descripción: {(changes.new as any).description}
                </p>

                <p className="text-sm text-neutral-700">
                  Resumen: {(changes.new as any).resume}
                </p>

                <p className="text-sm text-neutral-700">
                  Ubicación: {(changes.new as any).ubication}
                </p>

                <p className="text-sm text-neutral-700">
                  Día del Evento:{" "}
                  {new Date(
                    (changes.new as any).dateEvent,
                  ).toLocaleDateString()}
                </p>
              </div>
            </>
          )}

          {type === "UPDATE" && (
            <>
              {Object.entries(changes).map(([key, change], index) => (
                <div
                  key={index}
                  className="flex flex-col gap-4 border-b border-gray-200 pb-4"
                >
                  <div className="font-semibold text-gray-700 capitalize">
                    {key}
                  </div>
                  <div className="col-span-2">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Before Change */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-red-500">Antes</h3>
                        <p className="bg-red-50 border border-red-300 text-red-700 p-2 rounded-md">
                          {change?.before !== null &&
                          change?.before !== undefined
                            ? JSON.stringify(change.before, null, 2)
                            : "No value"}
                        </p>
                      </div>
                      {/* After Change */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-green-500">
                          Después
                        </h3>
                        <p className="bg-green-50 border border-green-300 text-green-700 p-2 rounded-md">
                          {change?.after !== null && change?.after !== undefined
                            ? JSON.stringify(change?.after, null, 2)
                            : "No value"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {type === "DELETE" && (
            <div>
              <p className="font-bold mb-2">Casting Eliminado</p>
              <p className="text-sm text-neutral-700">
                id: {(changes.before as any).id}
              </p>
              <p className="text-sm text-neutral-700">
                publicId: {(changes.before as any).publicId}
              </p>
              <p className="text-sm text-neutral-700">
                Nombre: {(changes.before as any).name}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewChanges;
