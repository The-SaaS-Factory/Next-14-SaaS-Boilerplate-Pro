/* eslint-disable no-unused-vars */
import {
  MultiSelect,
  MultiSelectItem,
  Select,
  SelectItem,
  Textarea,
  TextInput,
} from "@tremor/react";
import React, { useContext } from "react";
import { CastingContext } from "../CreateCasting";
import {
  ArchiveBoxArrowDownIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import ReactImageUploading from "react-images-uploading";

interface Props {
  fields: any[];
  onUpdate: (data: any) => void;
}

export const GenericStep: React.FC<Props> = ({ onUpdate, fields }) => {
  const { register, setValue, watch, errors } = useContext(CastingContext);

  return (
    <>
      <>
        {fields.map((field, index) => (
          <div key={`casting-field-${field.name}`} className="w-1/2 ">
            <label htmlFor={field.name} className="text-secundary  my-2">
              {field.label}
            </label>

            {field.type === "text" && (
              <div
                key={`field-${index}`}
                className="my-3 flex items-center justify-between "
              >
                <TextInput
                  className="flex-0"
                  value={watch(field.name)}
                  {...register(field.name, {
                    required: field.required,
                  })}
                  placeholder={field.placeholder!}
                  error={errors[`${field.name}`] && true}
                />
              </div>
            )}

            {field.type === "textarea" && (
              <div className="my-3">
                <div>
                  <Textarea
                    {...register(field.name, {
                      required: field.required,
                    })}
                    placeholder={field.placeholder!}
                    value={watch(field.name)}
                    error={errors[`${field.name}`] && true}
                    id={field.name}
                  />
                </div>
              </div>
            )}

            {field.type === "multiselect" && (
              <div className="my-3">
                <div className="flex rounded-md shadow-sm">
                  <MultiSelect
                    onValueChange={(value) => setValue(field.name, value)}
                    id={field.name}
                    value={watch(field.name)}
                  >
                    {field.options?.map((option: any, index: number) => {
                      if (field.name === "days") {
                        console.log(option.optionValue?.toString());
                      }

                      return (
                        <MultiSelectItem
                          value={option.optionValue?.toString() ?? ""}
                          key={`option-${index}`}
                        >
                          {option.optionName}
                        </MultiSelectItem>
                      );
                    })}
                  </MultiSelect>
                  {/* <select
                          className="input-text"
                          multiple
                          {...register(field.name, {
                            required: field.required,
                          })}
                        >
                          {field.options?.map(
                            (option: FieldSelectOption, index: number) => (
                              <option
                                value={option.optionValue}
                                key={`option-${index}`}
                              >
                                {option.optionName}
                              </option>
                            )
                          )}
                        </select> */}
                </div>
              </div>
            )}

            {field.type === "date" && (
              <div className="my-3">
                <div className="flex flex-col rounded-md shadow-sm">
                  <input
                    type="date"
                    {...register(field.name, {
                      required: field.required,
                    })}
                    value={watch(field.name)}
                    id={field.name}
                    className="input-text"
                  />
                </div>
                {field.note && (
                  <div className="italic ">
                    <p className="text-sm text-secundary">{field.note}</p>
                  </div>
                )}
              </div>
            )}

            {field.type === "gallery" && (
              <>
                <ReactImageUploading
                  multiple
                  value={watch(field.name)}
                  onChange={(items: any) => {
                    const currentImages = watch(field.name) || [];
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
                    setValue(field.name, updatedImages);
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
                            {imageList?.map((image: any, index: any) => (
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
                                      const currentImages = watch(field.name);
                                      const updatedImages =
                                        currentImages.slice(); // Create a copy of the current images
                                      updatedImages.splice(index, 1); // Remove the image at the specified index
                                      setValue(field.name, updatedImages);
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
                {field.note && (
                  <div className="italic ">
                    <p className="text-sm text-secundary">{field.note}</p>
                  </div>
                )}
              </>
            )}

            {field.type === "select" && (
              <div className="my-3">
                <div className="flex shadow-none ">
                  <Select
                    id={field.name}
                    onValueChange={(value) => setValue(field.name, value)}
                    value={watch(field.name)}
                  >
                    {field.options?.map((option: any, index: number) => (
                      <SelectItem
                        value={option.optionValue.toString()}
                        key={`option-${index}`}
                      >
                        {option.optionName}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </div>
            )}
          </div>
        ))}
      </>
    </>
  );
};
