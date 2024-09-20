/* eslint-disable no-unused-vars */
"use client";

import { Card } from "@/components/ui/card";
import {
  Briefcase,
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  RefreshCcw,
  Users,
} from "lucide-react";
import { StepIndicator } from "@/components/ui/StepIndicator";
import { createContext, useEffect, useState } from "react";
import { GenericStep } from "./Steps/GenericStep";
import {
  FieldValues,
  useForm,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { getAllCastingCategories } from "@/actions/admin/castingModule/get-all-casting-categories";
import { getUserCastingRoles } from "@/actions/admin/castingModule/get-user-casting-roles";
import { getAllCastingInformations } from "@/actions/admin/castingModule/get-all-casting-informations";
import {
  CastingFormat,
  CastingInformations,
  CastingRoles,
  CastingStatus,
} from "@prisma/client";
import { upsertCasting } from "@/actions/admin/castingModule/upsert-casting";
import { toast } from "sonner";
import { InformationSelector } from "./InformationSelector";
import { RoleSelector } from "./RoleSelector";
import { getStatusLabel } from "@/actions/utils/getStatusLabel";
import { getCastingDetailsForAllUsers } from "@/actions/admin/castingModule/get-casting-details";
import { formatDate } from "@/actions/utils/date";
import { redirect, useRouter } from "next/navigation";

const steps = [
  { id: 1, name: "Crear Casting" },
  { id: 2, name: "Datos adicionales" },
  { id: 3, name: "Pago y Formato" },
  { id: 4, name: "Informaciones adicionales" },
  { id: 5, name: "Roles" },
  { id: 6, name: "Resumen" },
];

interface CastingContextType {
  errors: any;
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}
export const CastingContext = createContext<CastingContextType | undefined>(
  undefined
);

export const CreateCasting = ({ modelId }: { modelId?: number }) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [casting, setCasting] = useState(null);
  const [_castingData, setCastingData] = useState(null);

  const [selectedInformations, setSelectedInformations] = useState<
    CastingInformations[]
  >([]);
  const [selectedRoles, setSelectedRoles] = useState<CastingRoles[]>([]);
  const [categories, setCategories] = useState(null);
  const [roles, setRoles] = useState(null);
  const [informations, setInformations] = useState(null);

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // const watchAllFields = watch();

  // useEffect(() => {
  //   //console.log("Campo modificado:", watchAllFields);
  //   setCastingData(watchAllFields);
  // }, [watchAllFields]);

  const fields1 = [
    {
      name: "name",
      label: "Nombre del casting",
      placeholder: "Ej. Concierto",
      type: "text",
      required: true,
    },
    {
      name: "resume",
      label: "Resumen del casting",
      placeholder: "Ej. Casting de modelos para evento musical.",
      type: "textarea",
      required: true,
      note: "Presenta tu casting en pocas palabras para que los modelos sepan de qué se trata.",
    },
    {
      name: "description",
      label: "Detalles del casting",
      placeholder: "Describe aquí todos los detalles relevantes del casting.",
      type: "textarea",
      required: false,
    },
  ];
  const fields3 = [
    {
      name: "paymentMethod",
      label: "Método de pago",
      placeholder: "Ej. Visa",
      type: "text",
      required: true,
    },
    {
      name: "status",
      label: "Estado",
      type: "select",
      options: Object.keys(CastingStatus).map((status) => ({
        optionName: getStatusLabel(status as any),
        optionValue: status,
      })),
      required: true,
    },
    {
      name: "format",
      label: "Formato del casting",
      type: "select",
      options: Object.keys(CastingFormat).map((status) => ({
        optionName: status === CastingFormat.PAID ? "Pagado" : "Colaboración",
        optionValue: status,
      })),
      required: true,
    },
  ];

  const fields2 = [
    {
      name: "categories",
      label: "Categorías",
      type: "multiselect",
      options: categories?.map((category) => ({
        optionName: category.name,
        optionValue: category.id,
      })),
      required: true,
    },
    {
      name: "ubication",
      label: "Ubicación",
      placeholder: "Ej: Miami",
      type: "text",
      required: true,
    },
    {
      name: "dateEvent",
      label: "Fecha del casting",
      type: "date",
      required: true,
    },
    {
      name: "dateLimitApplicants",
      label: "Fecha límite de aplicaciones",
      type: "date",
      required: true,
    },
    {
      name: "referenceImages",
      label: "Referencias de casting",
      type: "gallery",
      required: true,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const _categories = await getAllCastingCategories();
      const _roles = await getUserCastingRoles();
      const _informations = await getAllCastingInformations();

      setCategories(_categories);
      setRoles(_roles);
      setInformations(_informations);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const _datails = await getCastingDetailsForAllUsers(modelId);

      const fields = Object.entries(_datails);

      for (const [key, value] of fields) {
        if (value instanceof Date) {
          setValue(key, formatDate(value));
        } else if (Array.isArray(value)) {
          if (key === "informations") {
            setSelectedInformations(value as any);
          } else if (key === "roles") {
            setSelectedRoles(value as any);
          } else if (key === "categories") {
            setValue(
              key,
              value.map((item) => item.id.toString())
            );
          }
        } else {
          setValue(key, value);
        }
      }
    };

    if (modelId) fetchData();
  }, [modelId, setValue]);

  const handleCreateCasting = async (data: any) => {
    console.log({
      payload: {
        ...data,
        informations: selectedInformations,
        roles: selectedRoles,
      },
    });

    if (data.categories && data.categories.length > 0) {
      setLoading(true);

      try {
        await upsertCasting({
          modelId: modelId,
          payload: {
            ...data,
            informations: selectedInformations,
            roles: selectedRoles,
          },
        });

        toast.success("Casting actualizado correctamente");
        setLoading(false);
        router.push("/home/admin/castings/all");
      } catch (err) {
        console.log(err);
        toast.error("Ha ocurrido un error al crear el casting");
        setLoading(false);
      }
    } else {
      toast.error("Debe elegir una categoria para crear el casting");
      setLoading(false);
    }
  };

  return (
    <CastingContext.Provider value={{ watch, setValue, register, errors }}>
      <StepIndicator
        currentStep={currentStep}
        onStepChange={(step) => setCurrentStep(step)}
        steps={steps}
      >
        <form onSubmit={handleSubmit(handleCreateCasting)}>
          <div className={currentStep === 1 ? "" : "hidden"}>
            <GenericStep
              fields={fields1}
              onUpdate={(data) => {
                setCasting({ ...casting, ...data });
              }}
            ></GenericStep>
          </div>

          <div className={currentStep === 2 ? "" : "hidden"}>
            <GenericStep
              fields={fields2}
              onUpdate={(data) => {
                setCasting({ ...casting, ...data });
              }}
            ></GenericStep>
          </div>

          <div className={currentStep === 3 ? "" : "hidden"}>
            <GenericStep
              fields={fields3}
              onUpdate={(data) => {
                setCasting({ ...casting, ...data });
              }}
            ></GenericStep>
          </div>

          <div className={currentStep === 4 ? "" : "hidden"}>
            <InformationSelector
              informations={selectedInformations}
              setSelectedInformations={(informations) => {
                setSelectedInformations(informations);
              }}
            ></InformationSelector>
          </div>

          <div className={currentStep === 5 ? "" : "hidden"}>
            <RoleSelector
              roles={selectedRoles}
              setSelectedRoles={(roles) => {
                setSelectedRoles(roles);
              }}
            ></RoleSelector>
          </div>

          {currentStep === 6 && (
            <>
              <div className="">
                <div className=" py-12 pt-32 px-4 sm:px-6 lg:px-8">
                  <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold text-center mb-2">
                      {_castingData?.name!}
                    </h1>
                    <p className="text-xl text-center text-gray-600 mb-8">
                      {_castingData?.ubication!}
                    </p>

                    <Card className="p-6 mb-8">
                      <h2 className="text-2xl font-semibold mb-4">
                        Detalles del Casting
                      </h2>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <MapPin className="w-6 h-6 mr-2 text-primary" />
                          <span>Ubicación: {_castingData?.ubication!}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-6 h-6 mr-2 text-primary" />
                          <span>
                            Fecha Del Evento: {_castingData?.dateEvent!}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-6 h-6 mr-2 text-primary" />
                          <span>
                            Fecha Límite: {_castingData?.dateLimitApplicants!}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-6 h-6 mr-2 text-primary" />
                          <span>
                            Organizador: {_castingData?.profile?.name!}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Briefcase className="w-6 h-6 mr-2 text-primary" />
                          <span>
                            {_castingData?.description! ||
                              "No se ha previsto una descripción"}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-6 h-6 mr-2 text-primary" />
                          <span>{"No establecido"}</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
              <button
                disabled={loading}
                className="btn-main flex items-center gap-2"
                type="submit"
              >
                {loading && <RefreshCcw className="animate-spin"></RefreshCcw>}
                Publicar Casting
              </button>
            </>
          )}
        </form>
      </StepIndicator>

      {Object.keys(errors).length > 0 && (
        <div className="bg-red-300 rounded-md p-3 mt-4">
          <div className="flex flex-col">
            <p className="text-red-700 text-lg  ">Errors:</p>
            <ul>
              {Object.keys(errors).map((key, index) => (
                <li key={index} className="text-red-500">
                  {key}:{" "}
                  {errors[key]?.message ? (
                    <span>{String(errors[key]?.message)}</span>
                  ) : (
                    "Required"
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </CastingContext.Provider>
  );
};
