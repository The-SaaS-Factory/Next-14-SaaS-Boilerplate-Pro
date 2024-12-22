"use client";

//**************************************************************************************************/
// * Disclaimer: This code is not optimized. It is working but it can be improved. Sorry for the mess. :)
// * Remember, you can contact me on info@thesaasfactory.dev
//**************************************************************************************************/

/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Switch } from "@headlessui/react";
import { toast } from "sonner";
import { CldUploadButton } from "next-cloudinary";
import {
  ArchiveBoxArrowDownIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import ImageUploading from "react-images-uploading";
import { constants } from "@/lib/constants";
const cloudinaryPreset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_UPLOAD;

type FormInfo = {
  name: string;
  description: string;
};
const isDemoMode = constants.demoMode;

export type Field = {
  name: string;
  label: string;
  type: string;
  slug?: string;
  numberStep?: string;
  note?: string;
  forceInteger?: boolean;
  required: boolean;
  options?: FieldSelectOption[];
  hasLanguageSupport?: boolean;
};

type FieldSelectOption = {
  optionValue: string | number;
  optionName: string;
};

type FormProps = {
  values?: any;
  info?: FormInfo | null;
  fields: Field[];
  onSubmit: any;
  isSettingForm?: boolean;
  callback?;
  // eslint-disable-next-line no-unused-vars
  onAddNewField?: (data: Field) => void;
  newFieldsFunction?: boolean;
  autoSave?: boolean;
  modelToUpdate?: number;
  customSaveButtonText?: string;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const NewForm = ({
  values,
  info,
  fields,
  callback,
  onSubmit,
  onAddNewField,
  newFieldsFunction = false,
  autoSave = false,
  isSettingForm = false,
  modelToUpdate,
  customSaveButtonText,
}: FormProps) => {
  //States

  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const action: SubmitHandler<any> = async (data) => {
    setLoading(true);
    let payload: any = isSettingForm
      ? await parseSettingDataOnSubmit(data, fields)
      : await parseDataOnSubmit(data, fields);

    if (!payload) return;

    if (!isSettingForm) {
      payload = {
        modelId: modelToUpdate ?? null,
        payload: {
          ...payload,
        },
      };
    }

    await onSubmit(payload)
      .then(() => {
        toast.success(isSettingForm ? "Settings saved" : "Saved!");
        reset();
        callback && callback();
      })
      .catch((err: any) => {
        toast.error(err.message ?? "Error saving settings");
        return err;
      });

    setLoading(false);
  };

  const [newFieldData, setNewFieldData] = useState({
    name: "",
    label: "",
    type: "text",
    required: false,
  });

  const [mapSelectorsOpen, setMapSelectorsOpen] = useState({});

  //Funtions
  const openMapSelector = (fieldName: any) => {
    setMapSelectorsOpen({
      ...mapSelectorsOpen,
      [fieldName]: true,
    });
  };

  const closeMapSelector = (fieldName: any) => {
    setMapSelectorsOpen({
      ...mapSelectorsOpen,
      [fieldName]: false,
    });
  };

  const handleNewFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setNewFieldData({
      ...newFieldData,
      [name]: fieldValue,
    });
  };

  const handleAddNewField = () => {
    if (!newFieldData.name || !newFieldData.label) {
      return toast.error("Name and Label are required");
    }

    if (newFieldData.type == "list") {
      newFieldData.name += "list";
    }

    onAddNewField && onAddNewField(newFieldData);

    setNewFieldData({
      name: "",
      label: "",
      type: "text",
      required: false,
    });
  };

  useEffect(() => {
    //For settings forms
    if (Array.isArray(values)) {
      values.forEach((value: any) => {
        const field = fields.find((f: any) => f.name === value.settingName);

        if (field) {
          setValue(field.name, value.settingValue);
        }
      });
    } else if (typeof values === "object") {
      //When the form is not for settings
      for (const fieldName in values) {
        const field = fields.find((f: any) => f.name === fieldName);

        if (field) {
          if (typeof values[fieldName] === "object") {
            if (Array.isArray(values[fieldName])) {
              //if have column image, vy image else by name column

              if (values[fieldName].length > 0) {
                const images = values[fieldName].map((i: any) => {
                  return i.image ? i.image : i.id ? i.id.toString() : i;
                });
                setValue(field.name, images);
              }

              // const images = values[fieldName].map((i: any) => i.image);
              // setValue(field.name, images);
            } else {
              if (field.type === "date") {
                setValue(field.name, formatDate(values[fieldName]));
              } else {
                setValue(field.name, values[fieldName]);
              }
            }
            if (fieldName === "medias" || fieldName === "images") {
              setValue(fieldName, values[fieldName]);
            }
          } else {
            if (fieldName === "medias" || fieldName === "images") {
              setValue(
                fieldName,
                JSON.parse(values[fieldName]).map((i) => i.url),
              );
            } else if (field.type === "toggle") {
              setValue(fieldName, values[fieldName] ? "true" : "false");
            } else {
              setValue(fieldName, values[fieldName]);
            }
          }
        }
      }
    }
  }, [values, fields, setValue]);

  const formatDate = (date: any) => {
    if (date instanceof Date) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    return "";
  };

  if (loading)
    return (
      <div>
        <TableLoaderSkeleton count={4} />
      </div>
    );

  const getFielLabelInErrorCase = (key: string) => {
    //Parse key, if have language support, remove _lang
    let keyRaw = key;
    if (keyRaw.includes("_")) {
      key = key.split("_")[0];
    }
    const field = fields.find((f: any) => f.name === key);
    return field
      ? keyRaw.includes("_")
        ? field.label + " (" + keyRaw.split("_")[1] + ")"
        : field.label
      : key;
  };

  const handleDeleteIamge = (url: any, fieldName) => {
    const image = watch(fieldName).find((m: { url: any }) => m.url === url);
    if (!image) return;
    const images = watch(fieldName).filter(
      (i: { url: any }) => i.url != image.url,
    );
    setValue(fieldName, images);
  };
  const handleUploadResource = (data: any, fieldName) => {
    if (data?.info) {
      const currentImages = watch(fieldName) || [];
      const newImage = {
        url: data.info.secure_url,
        public_id: data.info.public_id,
        format: data.info.format ?? data.info.resource_type,
        name: data.info.original_filename,
        type: data.info.resource_type,
      };

      setValue(fieldName, [...currentImages, newImage]);
    }
  };

  return (
    <>
      <div>
        {Object.keys(errors).length > 0 && (
          <div className="rounded-md bg-red-300 p-3">
            <div className="flex flex-col">
              <p className="text-lg text-red-700">Errors:</p>
              <ul>
                {Object.keys(errors).map((key, index) => (
                  <li key={index} className="text-red-500">
                    {getFielLabelInErrorCase(key)}:{" "}
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
      </div>
      <form className="w-full" onSubmit={handleSubmit(action)}>
        <div className="space-y-12">
          <div
            className={`grid grid-cols-1 lg:gap-x-8 ${
              info && "md:grid-cols-3"
            }`}
          >
            {info && (
              <div className="py-7 lg:col-span-1 lg:p-7">
                <h2 className="text-base">{info.name}</h2>
                <p className="mt-3 text-base leading-6">{info.description}</p>
              </div>
            )}
            <div className="grid grid-cols-1 gap-x-4 lg:col-span-2">
              {fields.map((field, index) => (
                <div
                  className={`my-3 flex max-w-md ${
                    field.type === "toggle"
                      ? "flex-row justify-between"
                      : "flex-col"
                  } `}
                  key={index}
                >
                  <label htmlFor={field.name} className="text-primary">
                    {field.label}
                  </label>
                  {field.type === "text" && (
                    <div className="mt-2">
                      <div className="flex flex-col">
                        <TextInput
                          id={field.name}
                          placeholder=""
                          {...register(field.name, {
                            required: field.required,
                          })}
                          error={errors[`${field.name}`] && true}
                        />
                      </div>
                      {field.note && (
                        <div className="italic">
                          <p className="text-sm">{field.note}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {field.type === "password" && (
                    <div className="mt-2">
                      <div className="flex flex-col rounded-md shadow-sm">
                        <TextInput
                          type="password"
                          placeholder=""
                          id={field.name}
                          {...register(field.name, {
                            required: field.required,
                          })}
                          error={errors[`${field.name}`] && true}
                        />
                      </div>
                      {field.note && (
                        <div className="italic">
                          <p className="text-secondary text-sm">{field.note}</p>
                        </div>
                      )}
                    </div>
                  )}
                  {field.type === "number" && (
                    <div className="mt-2">
                      <div className="flex flex-col rounded-md shadow-sm">
                        <NumberInput
                          placeholder=""
                          {...register(field.name, {
                            required: field.required,
                          })}
                          step={field.numberStep ?? "0.01"}
                          error={errors[`${field.name}`] && true}
                          id={field.name}
                        />
                      </div>
                      {field.note && (
                        <div className="italic">
                          <p className="text-secondary text-sm">{field.note}</p>
                        </div>
                      )}
                    </div>
                  )}
                  {field.type === "date" && (
                    <div className="mt-2">
                      <div className="flex flex-col rounded-md shadow-sm">
                        <input
                          type="date"
                          //  value={formatDate(watch(field.name))}
                          {...register(field.name, {
                            required: field.required,
                          })}
                          id={field.name}
                          className="input-text"
                        />
                      </div>
                      {field.note && (
                        <div className="italic">
                          <p className="text-secondary text-sm">{field.note}</p>
                        </div>
                      )}
                    </div>
                  )}
                  {field.type === "slug" && (
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm">
                        <TextInput
                          placeholder=""
                          {...register(field.name, {
                            required: field.required,
                          })}
                          error={errors[`${field.name}`] && true}
                          id={field.name}
                        />
                      </div>
                    </div>
                  )}
                  {field.type === "textarea" && (
                    <div className="mt-2">
                      <div>
                        <Textarea
                          {...register(field.name, {
                            required: field.required,
                          })}
                          placeholder=""
                          value={watch(field.name)}
                          error={errors[`${field.name}`] && true}
                          id={field.name}
                        />
                      </div>
                    </div>
                  )}

                  {field.type === "toggle" && (
                    <Switch.Group as="div" className="flex">
                      <Switch
                        checked={watch(field.name) === "true"}
                        onChange={(isChecked) => {
                          setValue(field.name, isChecked.toString());
                        }}
                        className={classNames(
                          (watch(field.name) === "true" ? true : false)
                            ? "bg-indigo-600"
                            : "bg-gray-200",
                          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2",
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={classNames(
                            (watch(field.name) === "true" ? true : false)
                              ? "translate-x-5"
                              : "translate-x-0",
                            "text pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                          )}
                        />
                      </Switch>
                    </Switch.Group>
                  )}
                  {field.type === "select" && (
                    <div className="mt-2">
                      <div className="flex shadow-none">
                        <Select
                          id={field.name}
                          onValueChange={(value) => setValue(field.name, value)}
                          value={watch(field.name)}
                        >
                          {field.options?.map(
                            (option: FieldSelectOption, index: number) => (
                              <SelectItem
                                value={option.optionValue.toString()}
                                key={`option-${index}`}
                              >
                                {option.optionName}
                              </SelectItem>
                            ),
                          )}
                        </Select>
                      </div>
                    </div>
                  )}

                  {field.type === "searchselect" && (
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm">
                        <SearchSelect
                          onValueChange={(value) => setValue(field.name, value)}
                          id={field.name}
                          value={watch(field.name)?.toString()}
                        >
                          {field.options?.map(
                            (option: FieldSelectOption, index: number) => (
                              <SearchSelectItem
                                value={option.optionValue.toString()}
                                key={`option-${index}`}
                              >
                                {option.optionName}
                              </SearchSelectItem>
                            ),
                          )}
                        </SearchSelect>
                      </div>
                    </div>
                  )}

                  {field.type === "multiselect" && (
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm">
                        <MultiSelect
                          onValueChange={(value) => setValue(field.name, value)}
                          id={field.name}
                          value={watch(field.name)}
                          required={field.required}
                        >
                          {field.options?.map(
                            (option: FieldSelectOption, index: number) => {
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
                            },
                          )}
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

                  {field.type === "list" && (
                    <ListFeatureField
                      itemsOnEdit={watch(field.name)}
                      name={field.name}
                      fields={fields}
                      label={field.label}
                      onAddFeatureList={(item) => setValue(field.name, item)}
                    />
                  )}

                  {field.type === "file" && (
                    <>
                      <div className="mt-2 sm:col-span-2 sm:mt-0">
                        {!watch(field.name) ? (
                          <div>
                            <input
                              type="file"
                              onChange={(e) => {
                                //Convert in base64
                                const file = e.target.files[0];
                                const reader = new FileReader();
                                reader.readAsDataURL(file);

                                reader.onload = () => {
                                  console.log(reader.result);

                                  setValue(field.name, reader.result);
                                };
                              }}
                              id={field.name}
                              className="input-text"
                            />
                          </div>
                        ) : (
                          <div>
                            <div className="flex space-x-3">
                              <span>Loaded</span>
                              <button
                                onClick={() => setValue(field.name, null)}
                                className="icon"
                              >
                                <XMarkIcon className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {field.note && (
                        <div className="italic">
                          <p className="text-secondary text-sm">{field.note}</p>
                        </div>
                      )}
                    </>
                  )}
                  {field.type === "image" && (
                    <>
                      <ImageUploading
                        value={watch(field.name)}
                        onChange={(item: any) => setValue(field.name, item)}
                        maxNumber={1}
                        dataURLKey="data_url"
                      >
                        {({
                          imageList: imageListAvatar,
                          onImageUpload: onImageUploadAvatar,
                          onImageRemoveAll: onImageRemoveAllAvatar,
                          dragProps: dragPropsAvatar,
                        }: any) => (
                          // write your building UI
                          <div className="upload__image-wrapper">
                            <div className="col-span-full">
                              <div className="mt-2 flex items-center gap-x-3">
                                <div onClick={onImageRemoveAllAvatar}>
                                  {!imageListAvatar[0] ? (
                                    <div className="flex items-center space-x-3">
                                      <PhotoIcon
                                        className="h-10 w-10 text-gray-300"
                                        aria-hidden="true"
                                      />
                                      <button
                                        onClick={(e) => {
                                          e.preventDefault();
                                          onImageUploadAvatar();
                                        }}
                                        {...dragPropsAvatar}
                                        type="button"
                                        className="text-primary rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                      >
                                        Change
                                      </button>
                                    </div>
                                  ) : (
                                    <div>
                                      {typeof imageListAvatar === "string" ? (
                                        <Image
                                          width={50}
                                          height={50}
                                          src={imageListAvatar}
                                          className="h-12 w-12 rounded-full"
                                          alt=""
                                        />
                                      ) : (
                                        <div key={index} className="image-item">
                                          <Image
                                            width={50}
                                            height={50}
                                            src={
                                              imageListAvatar[0].data_url ?? ""
                                            }
                                            className="h-12 w-12 rounded-full"
                                            alt=""
                                          />
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            &nbsp;
                          </div>
                        )}
                      </ImageUploading>
                      {field.note && (
                        <div className="italic">
                          <p className="text-secondary text-sm">{field.note}</p>
                        </div>
                      )}
                    </>
                  )}
                  {field.type === "mapSelector" && (
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm">
                        <input
                          {...register(field.name, {
                            required: field.required,
                          })}
                          type={"text"}
                          name={field.name}
                          step="0.01"
                          id={field.name}
                          className="input-text"
                        />
                        <button
                          className="btn-main"
                          onClick={(e) => {
                            e.preventDefault();
                            openMapSelector(field.name);
                          }}
                        >
                          <MapPinIcon className="h-5 w-5" />
                        </button>
                      </div>
                      {field.note && (
                        <div className="italic">
                          <p className="text-secondary text-sm">{field.note}</p>
                        </div>
                      )}

                      <MapSelector
                        openModal={
                          (mapSelectorsOpen[
                            field.name as keyof typeof mapSelectorsOpen
                          ] ?? false)
                            ? true
                            : false
                        }
                        address={watch(field.name) ?? null}
                        onClose={() => closeMapSelector(field.name)}
                        // onSelect={(address: string | null) => {
                        //   setValue(field.name, address);
                        //   closeMapSelector(field.name);
                        // }}
                        handleChangeAddress={(address) => {
                          setValue(field.name, address);
                        }}
                      />
                    </div>
                  )}
                  {field.type === "gallery" && (
                    <>
                      <ImageUploading
                        multiple
                        value={watch(field.name)}
                        onChange={(items: any) => {
                          const currentImages = watch(field.name) || [];
                          const updatedImages = currentImages.slice(); // Create a copy of the current images

                          items.forEach((newImage: any) => {
                            // Check if the new image already exists in the current list
                            const existingImageIndex = updatedImages.findIndex(
                              (img: any) => img.data_url === newImage.data_url,
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
                              <div className="mt-2 items-center gap-x-3">
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
                                        className="m-2 h-16 w-16 rounded-lg object-cover shadow-lg"
                                      />
                                      <div className="image-item__btn-wrapper">
                                        <button
                                          onClick={(e) => {
                                            e.preventDefault();
                                            const currentImages = watch(
                                              field.name,
                                            );
                                            const updatedImages =
                                              currentImages.slice(); // Create a copy of the current images
                                            updatedImages.splice(index, 1); // Remove the image at the specified index
                                            setValue(field.name, updatedImages);
                                          }}
                                          className="icon"
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
                                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-primary shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
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
                      </ImageUploading>
                      {field.note && (
                        <div className="italic">
                          <p className="text-secondary text-sm">{field.note}</p>
                        </div>
                      )}
                    </>
                  )}
                  {field.type === "gallery-cloudinary" && (
                    <>
                      <div className="col-span-full">
                        <div className="mt-2 w-full">
                          <CldUploadButton
                            className="flex items-center space-x-3"
                            onSuccess={(data) => {
                              handleUploadResource(data, field.name);
                            }}
                            uploadPreset={cloudinaryPreset}
                          >
                            <Button variant="outline">
                              <ArrowUpCircleIcon className="mr-1 h-5 w-5 text-gray-500" />{" "}
                              <span>Media files</span>
                            </Button>
                          </CldUploadButton>
                          <div className="flex flex-wrap space-x-3">
                            {Array.isArray(watch(field.name)) &&
                              watch(field.name)?.map(
                                (media: any, index: number) => (
                                  <div
                                    key={`image${index}`}
                                    className="relative p-3"
                                  >
                                    {media.resource_type === "video" ||
                                    media.format.includes(
                                      "mkv",
                                      "mp4",
                                      "webm",
                                      "avi",
                                      "mov",
                                    ) ? (
                                      <Image
                                        width={80}
                                        height={80}
                                        className="h-32 w-auto rounded-lg object-cover object-center"
                                        alt=""
                                        src={"/assets/img/video.png"}
                                      />
                                    ) : (
                                      <>
                                        {media.url && (
                                          <Image
                                            width={80}
                                            height={80}
                                            className="h-32 w-auto rounded-lg object-cover object-center"
                                            alt=""
                                            src={media.url}
                                          />
                                        )}
                                      </>
                                    )}

                                    <span className="text-xs">
                                      {media.name
                                        ? media.name
                                        : media.public_id}
                                    </span>
                                    <div className="absolute right-1 top-0 flex rounded-full bg-white p-1 shadow-lg">
                                      <button
                                        onClick={(e) => {
                                          e.preventDefault();
                                          handleDeleteIamge(
                                            media.url,
                                            field.name,
                                          );
                                        }}
                                      >
                                        <TrashIcon className="h-5 w-5" />
                                      </button>
                                    </div>
                                  </div>
                                ),
                              )}
                          </div>
                        </div>
                      </div>
                      {field.note && (
                        <div className="italic">
                          <p className="text-secondary text-sm">{field.note}</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}

              {newFieldsFunction && (
                <>
                  <div className="mt-6 flex flex-col rounded-md bg-gray-50 shadow-sm">
                    <h3 className="text-subtitle p-3">Add New Field</h3>
                    <div className="flex items-center space-x-3 px-3">
                      <input
                        type="text"
                        name="name"
                        className="input-text"
                        placeholder="Field Name"
                        value={newFieldData.name}
                        onChange={handleNewFieldChange}
                      />
                      <input
                        type="text"
                        name="label"
                        className="input-text"
                        placeholder="Field Label"
                        value={newFieldData.label}
                        onChange={handleNewFieldChange}
                      />
                      <select
                        className="input-text"
                        onChange={(e) => {
                          setNewFieldData({
                            ...newFieldData,
                            ["type"]: e.target.value,
                          });
                        }}
                        value={newFieldData.type}
                      >
                        <option value="">Select</option>
                        <option value="list">List</option>
                        <option value="text">Text</option>
                        <option value="textarea">TextArea</option>
                      </select>
                    </div>
                    <button
                      type="button"
                      className="btn-secundary ml-auto p-3"
                      onClick={handleAddNewField}
                    >
                      <span>Add Field</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {!autoSave && (
          <div className="mt-6 flex max-w-5xl items-center justify-end gap-x-6 pr-7">
            {isDemoMode ? (
              <Button type="submit" disabled>
                Demo Mode Enabled
              </Button>
            ) : (
              <Button type="submit">
                {customSaveButtonText ? customSaveButtonText : "Save"}
              </Button>
            )}
          </div>
        )}
        <hr className="my-4" />
        <br />
      </form>
    </>
  );
};

type ListFeatureFieldProps = {
  name: string;
  label: string;
  itemsOnEdit: any;
  fields: any;
  onAddFeatureList: (item: any) => void;
};

const ListFeatureField: React.FC<ListFeatureFieldProps> = ({
  itemsOnEdit,
  fields,
  onAddFeatureList,
}) => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    if (Array.isArray(itemsOnEdit)) {
      setItems(itemsOnEdit); // Load the items for editing
    } else if (typeof itemsOnEdit === "object") {
      const updatedItems: any = [];

      for (const fieldName in itemsOnEdit) {
        const field = fields.find((f: Field) => f.name === fieldName);

        if (field) {
          updatedItems.push({
            Name: field.label, // Example: You can customize this based on your data structure
            Description: itemsOnEdit[fieldName], // Example: You can customize this based on your data structure
          });
        }
      }

      setItems(updatedItems);
    }
  }, [itemsOnEdit, fields]);

  const [addMore, setAddMore] = useState(itemsOnEdit > 0 ? itemsOnEdit : []);
  const [newItem, setNewItem] = useState<{ [key: string]: string }>({});

  const handleAddItem = () => {
    if (Object.keys(newItem).length === 0) return; // No fields added
    setItems([...items, newItem]);
    // Notify the parent component
    setNewItem({});
  };

  const saveList = () => {
    toast.success("List saved");
    onAddFeatureList(items);
    setAddMore(false);
  };

  const handleFieldChange = (fieldName: string, value: string) => {
    setNewItem({
      ...newItem,
      [fieldName]: value,
    });
  };
  const handleFieldChangeOnEdit = (
    fieldName: string,
    value: string,
    index: number,
  ) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      const editedItem = { ...updatedItems[index] };
      editedItem[fieldName] = value;
      updatedItems[index] = editedItem;
      return updatedItems;
    });
  };

  return (
    <div className="ml-3 rounded-xl border-2 p-3">
      {items.map((item, index) => (
        <div key={index}>
          {Object.entries(item).map(([field, valueField]) => (
            <div key={field}>
              <label>{field}</label>
              <input
                type="text"
                className="input-text"
                value={valueField as string}
                onChange={(e) => {
                  handleFieldChangeOnEdit(field, e.target.value, index);
                }}
              />
            </div>
          ))}
        </div>
      ))}

      {items.length > 0 && (
        <button
          onClick={(e) => {
            e.preventDefault();
            saveList();
          }}
          className="btn-main m-3 mx-auto flex"
        >
          Save list
        </button>
      )}
      {addMore ? (
        <div className="mt-6 flex flex-col rounded-md bg-gray-50 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
          <h3 className="text-subtitle p-3">Add New Item </h3>
          <div className="flex flex-col items-center space-y-2 px-3">
            <input
              type="text"
              name="name"
              className="input-text"
              placeholder="Feature Name"
              value={newItem.Name || ""}
              onChange={(e) => handleFieldChange("Name", e.target.value)}
            />
            <input
              type="text"
              name="label"
              className="input-text"
              placeholder="Feature Description"
              value={newItem.Description || ""}
              onChange={(e) => handleFieldChange("Description", e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn-secundary ml-auto p-3"
            onClick={handleAddItem}
          >
            <span>Add Feature</span>
          </button>
        </div>
      ) : (
        <button
          onClick={(e) => {
            e.preventDefault();
            setAddMore(true);
          }}
          className="btn-main m-3 mx-auto flex"
        >
          Edit list
        </button>
      )}
    </div>
  );
};

import { Fragment, useRef, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { LoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
import { MapPinIcon } from "@heroicons/react/24/outline";

import {
  MultiSelect,
  MultiSelectItem,
  NumberInput,
  SearchSelect,
  SearchSelectItem,
  Select,
  SelectItem,
  TextInput,
  Textarea,
} from "@tremor/react";
import Image from "next/image";
import {
  parseDataOnSubmit,
  parseSettingDataOnSubmit,
} from "@/utils/facades/frontendFacades/formFacade";
import TableLoaderSkeleton from "../ui/loaders/TableLoaderSkeleton";
import { Button } from "../ui/button";
import { ArrowUpCircleIcon, TrashIcon } from "lucide-react";
export function MapSelector({
  openModal,
  address,
  handleChangeAddress,
  onClose,
}: {
  openModal: boolean;
  address: string | null;
  handleChangeAddress: (address: string) => void;
  onClose: () => void;
}) {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  //States
  const map = useRef(null);
  const [open, setOpen] = useState(false);
  const [latLng, setLatLng] = useState({ lat: 38.7253, lng: -9.15 });
  const [addressValue, setAddressValue] = useState(address ?? null);

  //Center capital portugal
  const [center, setCenter] = useState({ lat: 38.7253, lng: -9.15 });
  useEffect(() => {
    setLatLng({ lat: center.lat, lng: center.lng });
  }, [center]);

  const [isScriptLoaded, setScriptLoaded] = useState(false);
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  //Hooks
  useEffect(() => {
    setOpen(openModal);

    return () => {
      setOpen(false);
    };
  }, [openModal]);

  useEffect(() => {
    setAddressValue(address);
  }, [address]);

  useEffect(() => {
    if (address && !latLng) {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleMapsApiKey}`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.results.length > 0) {
            const location = data.results[0].geometry.location;

            setCenter({
              lat: location.lat,
              lng: location.lng,
            });
            setLatLng({
              lat: location.lat,
              lng: location.lng,
            });
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }, [address, googleMapsApiKey, latLng, openModal]);

  //Functions

  const handleAddressChange = (e: any) => {
    setAddressValue(e.target.value);
    handleChangeAddress(e.target.value);
  };

  const handleMarkerDragEnd = (e: any) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    setLatLng({ lat, lng });

    //If address Value already has lat and lng, remove it
    const addressValueSplit = addressValue?.split("---") ?? [];
    const addressValueWithoutLatLng =
      (addressValueSplit && addressValueSplit[0]) ?? "";

    //Set new address value
    const finalAddress = addressValueWithoutLatLng + "---" + `${lat},${lng}`;

    setAddressValue(finalAddress);

    handleChangeAddress(finalAddress);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <MapPinIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text text-base font-semibold leading-6"
                    >
                      Select Address
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-secondary text-sm">
                        {latLng && (
                          <input
                            type="text"
                            placeholder="Address"
                            className="input-text"
                            onChange={handleAddressChange}
                            value={addressValue as string}
                          />
                        )}
                      </p>

                      {addressValue && (
                        <div>
                          {window.google === undefined ? (
                            <LoadScript
                              ref={map}
                              googleMapsApiKey={googleMapsApiKey || ""}
                              onLoad={() => {
                                setScriptLoaded(true);
                              }}
                            >
                              {isScriptLoaded && (
                                <div className="relative">
                                  <GoogleMap
                                    key={Date.now()}
                                    mapContainerStyle={mapContainerStyle}
                                    center={center}
                                    zoom={15}
                                  >
                                    <MarkerF
                                      position={latLng}
                                      draggable={true}
                                      onDragEnd={(e) => handleMarkerDragEnd(e)}
                                    />
                                  </GoogleMap>

                                  <div className="absolute left-1 top-1 w-full">
                                    <div className="absolute left-1 top-1 m-1 flex space-x-3 rounded bg-white p-3 shadow-md">
                                      <MapPinIcon className="text-secondary h-5 w-5" />
                                      <p>{address}</p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </LoadScript>
                          ) : (
                            <div className="relative">
                              <GoogleMap
                                key={Date.now()}
                                mapContainerStyle={mapContainerStyle}
                                center={center}
                                zoom={15}
                              >
                                <MarkerF
                                  position={latLng}
                                  draggable={true}
                                  onDragEnd={(e) => handleMarkerDragEnd(e)}
                                />
                              </GoogleMap>

                              <div className="absolute left-1 top-1 w-full">
                                <div className="absolute left-1 top-1 m-1 flex space-x-3 rounded bg-white p-3 shadow-md">
                                  <MapPinIcon className="text-secondary h-5 w-5" />
                                  <p>{address}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={onClose}
                  >
                    Selecione o endereço
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default NewForm;
