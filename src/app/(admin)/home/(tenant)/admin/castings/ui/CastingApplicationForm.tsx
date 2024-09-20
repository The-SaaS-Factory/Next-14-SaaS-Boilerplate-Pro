"use client";

import { Card } from "@/components/ui/card";
import { getCastingDetailsForAllUsers } from "@/actions/admin/castingModule/get-casting-details";
import { sendApplyToCasting } from "@/actions/admin/castingModule/send-apply-to-casting";
import { CustomDialog } from "@/components/ui/componenets/Dialog";
import {
  ArchiveBoxArrowDownIcon,
  CheckCircleIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import {
  Casting,
  CastingAplication,
  CastingInformations,
  CastingRoles,
} from "@prisma/client";
import { Link1Icon } from "@radix-ui/react-icons";
import { NumberInput, Textarea, TextInput } from "@tremor/react";
import { MailOpenIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactImageUploading from "react-images-uploading";
import { useWindowSize } from "react-use";
import { toast } from "sonner";
import Confetti from "react-confetti";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export const CastingApplicationForm = ({
  casting,
  applications,
}: {
  casting: Casting;
  applications: CastingAplication[];
}) => {
  const [informations, setInformation] = useState<CastingInformations[] | null>(
    null
  );
  const [roles, setRoles] = useState<CastingRoles[] | null>(null);
  const [selectedRole, setSelectedRole] = useState<CastingRoles | null>(null);

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [showConfetti, setShowConfetti] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { height, width } = useWindowSize();

  const session = useSession();

  useEffect(() => {
    const fetchData = async () => {
      const info = await getCastingDetailsForAllUsers(casting.id);
      setInformation(info.informations);
      setRoles(info.roles);
    };

    fetchData();
  }, [casting.id]);

  useEffect(() => {
    if (!showDialog) setSelectedRole(null);
  }, [showDialog]);

  const isApplicationCompleted = (roleId: number) => {
    return (
      applications?.find(
        (item) => item.roleId === roleId && item.castingId === casting.id
      ) !== undefined
    );
  };

  const handleApplyCasting = async (payload) => {
    try {
      await sendApplyToCasting({
        modelId: casting.id,
        payload: { ...payload, roleId: selectedRole?.id },
      });

      setShowConfetti(true);
      setShowDialog(false);
      toast.success("¡Tu aplicación ha sido enviada con éxito!", {
        duration: 3000,
      });
      setTimeout(() => setShowConfetti(false), 5000);
    } catch {
      toast.error("Ha ocurrido un problema al crear la solicitud");
    }
  };

  return (
    <>
      {showConfetti && (
        <Confetti width={width - 50} height={height + 300} recycle={false} />
      )}

      {/* Roles */}
      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Roles Disponibles para Aplicar
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(casting as any).roles?.map((role, index) => (
            <Button
              disabled={isApplicationCompleted(role.id)}
              key={index}
              variant="outline"
              className="justify-start h-auto py-4 gap-2"
              onClick={() => {
                setSelectedRole(roles?.find((item) => item.id === role.id));
                setShowDialog(true);
              }}
            >
              <p>{isApplicationCompleted(role.id)}</p>
              {isApplicationCompleted(role.id) && (
                <CheckCircleIcon className="size-8 text-green-400"></CheckCircleIcon>
              )}
              <div className="text-left">
                <h3 className="font-semibold">{role.name}</h3>
                <p className="text-sm text-gray-600">{"Descripción"}</p>
              </div>
            </Button>
          ))}
        </div>

        {roles?.length === 0 && (
          <p className="text-neutral-400">
            No se han definido roles para este casting
          </p>
        )}
      </Card>

      {session.status === "authenticated" ? (
        <CustomDialog
          open={showDialog}
          setOpen={setShowDialog}
          activateUrl="apply"
          label=""
          dialogTitle="Detalles de la Aplicación"
        >
          <form
            onSubmit={handleSubmit(handleApplyCasting)}
            className="flex flex-col gap-2 overflow-y-hidden"
          >
            <div className="flex flex-col gap-2 overflow-y-auto">
              {roles && roles.length > 0 && (
                <>
                  <label className="font-medium mt-2">
                    Seleccionar el rol para Aplicar al Casting
                  </label>
                  <select
                    value={selectedRole?.id}
                    onChange={(e) =>
                      setSelectedRole(
                        roles?.find(
                          (item) => item.id === parseInt(e.target.value)
                        )
                      )
                    }
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value={""}>Ninguno</option>
                    {roles?.map((role) => (
                      <option key={`role-${role.id}`} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </>
              )}

              {informations?.length > 0 && (
                <p className="text-sm text-neutral-400 text-center">
                  Otros Datos
                </p>
              )}

              {informations?.map((item, index) => (
                <>
                  <label className="font-medium">{item.name}</label>
                  {item.type === "NUMBER" && (
                    <div
                      key={`field-${index}`}
                      className="flex items-center justify-between "
                    >
                      <NumberInput
                        className="flex-0"
                        value={watch(item.name)}
                        {...register(item.name, {
                          required: true,
                        })}
                        error={errors[`${item.name}`] && true}
                      />
                    </div>
                  )}

                  {item.type === "TEXT" && (
                    <div
                      key={`field-${index}`}
                      className="flex items-center justify-between "
                    >
                      <TextInput
                        className="flex-0"
                        value={watch(item.name)}
                        {...register(item.name, {
                          required: true,
                        })}
                        error={errors[`${item.name}`] && true}
                      />
                    </div>
                  )}

                  {item.type === "EMAIL" && (
                    <div
                      key={`field-${index}`}
                      className="flex items-center justify-between "
                    >
                      <TextInput
                        className="flex-0"
                        placeholder="jhondoe@mail.com"
                        icon={MailOpenIcon}
                        value={watch(item.name)}
                        {...register(item.name, {
                          required: true,
                        })}
                        error={errors[`${item.name}`] && true}
                      />
                    </div>
                  )}

                  {item.type === "GALLERY" && (
                    <>
                      <ReactImageUploading
                        multiple
                        value={watch(item.name)}
                        onChange={(items: any) => {
                          const currentImages = watch(item.name) || [];
                          const updatedImages = currentImages.slice(); // Create a copy of the current images

                          items.forEach((newImage: any) => {
                            // Check if the new image already exists in the current list
                            const existingImageIndex = updatedImages.findIndex(
                              (img: any) => img.data_url === newImage.data_url
                            );

                            if (existingImageIndex !== -1) {
                              // If it exists, update the existing image
                              updatedImages[existingImageIndex] = newImage;
                            } else {
                              // If it doesn't exist, add the new image to the list
                              updatedImages.push(newImage);
                            }
                          });

                          // Set the updated list of images in the form state
                          setValue(item.name, updatedImages);
                        }}
                        maxNumber={10}
                        dataURLKey="data_url"
                      >
                        {({
                          imageList,
                          onImageUpload,
                          onImageRemove,
                          dragProps: dragPropsAvatar,
                        }: any) => (
                          <div className="">
                            <div className="col-span-full">
                              <div className="mt-2   items-center gap-x-3">
                                <div
                                  className="col-span-full"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    onImageUpload();
                                  }}
                                  {...dragPropsAvatar}
                                >
                                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                      <PhotoIcon
                                        className="mx-auto h-12 w-12 text-gray-300"
                                        aria-hidden="true"
                                      />
                                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                        <label
                                          htmlFor="file-upload"
                                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                        >
                                          <span> {"Add"}</span>
                                          <input
                                            id="file-upload"
                                            name="file-upload"
                                            type="file"
                                            className="sr-only"
                                          />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                      </div>
                                      <p className="text-xs leading-5 text-gray-600">
                                        PNG, JPG, GIF up to 10MB
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-wrap">
                                  {imageList.map((image: any, index: any) => (
                                    <div key={index} className="image-item">
                                      <Image
                                        width={50}
                                        height={50}
                                        onClick={(e) => {
                                          e.preventDefault();
                                          onImageRemove(index);
                                        }}
                                        src={image.data_url ?? image}
                                        alt=""
                                        className="rounded-lg shadow-lg m-2  w-16 h-16 object-cover"
                                      />
                                      <div className="image-item__btn-wrapper">
                                        <button
                                          onClick={(e) => {
                                            e.preventDefault();
                                            const currentImages = watch(
                                              item.name
                                            );
                                            const updatedImages =
                                              currentImages.slice(); // Create a copy of the current images
                                            updatedImages.splice(index, 1); // Remove the image at the specified index
                                            setValue(item.name, updatedImages);
                                          }}
                                          className="icon "
                                        >
                                          <ArchiveBoxArrowDownIcon className="h-5 w-5" />
                                        </button>
                                      </div>
                                    </div>
                                  ))}

                                  {/* <div className="flex items-center space-x-3">
                                    <PhotoIcon
                                      className="h-10 w-10 text-gray-300"
                                      aria-hidden="true"
                                    />
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        onImageUpload();
                                      }}
                                      {...dragPropsAvatar}
                                      type="button"
                                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    >
                                      {t("Add")}
                                    </button>
                                  </div> */}
                                </div>
                              </div>
                            </div>
                            &nbsp;
                          </div>
                        )}
                      </ReactImageUploading>
                    </>
                  )}

                  {item.type === "LINK" && (
                    <div
                      key={`field-${index}`}
                      className="flex items-center justify-between "
                    >
                      <TextInput
                        icon={Link1Icon}
                        className="flex-0"
                        placeholder="https://linktosomewhereplace.com"
                        value={watch(item.name)}
                        {...register(item.name, {
                          required: true,
                        })}
                        error={errors[`${item.name}`] && true}
                      />
                    </div>
                  )}

                  {item.type === "TEXTAREAFF" && (
                    <div
                      key={`field-${index}`}
                      className="flex items-center justify-between "
                    >
                      <Textarea
                        className="flex-0"
                        value={watch(item.name)}
                        {...register(item.name, {
                          required: true,
                        })}
                        error={errors[`${item.name}`] && true}
                      />
                    </div>
                  )}
                </>
              ))}

              {informations?.length === 0 && (
                <p className="text-center text-neutral-400 my-5">
                  No se requieren datos adicionales para aplicar a este casting
                </p>
              )}
            </div>

            <Button
              className="mt-2"
              disabled={roles?.length !== 0 && !selectedRole}
              type="submit"
            >
              Aplicar al Casting
            </Button>
          </form>
        </CustomDialog>
      ) : (
        <p className="text-center text-sm text-neutral-400">
          Inicie Sesion para aplicar al casting
        </p>
      )}
    </>
  );
};
