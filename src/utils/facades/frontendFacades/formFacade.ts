"use client";
import { Field } from "@/components/core/NewForm";
import { SuperAdminSetting } from "@/interfaces/superAdminModule";
import { constants } from "@/lib/constants";
import { saveImage } from "@/utils/facades/serverFacades/mediaFacade";

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/utils/media"
    : `${constants.appUrl}/api/utils/media`;

export const parseSettingDataOnSubmit = async (data: any, fields: any) => {
  try {
    const payload: SuperAdminSetting[] = [];
    const promises = fields.map(async (field: Field) => {
      const fieldName = field.name;
      const fieldValue = data[fieldName];
      let valueFinal: any = fieldValue;

      if (fieldValue !== undefined) {
        if (field.type === "image") {
          if (
            fieldValue &&
            fieldValue.length > 0 &&
            typeof fieldValue[0] === "object"
          ) {
            await fetch(url, {
              method: "POST",
              body: JSON.stringify(fieldValue[0].data_url),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => {
                return response.json();
              })
              .then((response) => {
                if (response) {
                  valueFinal = response.url;
                } else {
                  valueFinal = null;
                }
                return response;
              })
              .catch(() => {
                valueFinal = null;
              });
          }
        } else if (field.type === "textarea") {
          valueFinal = fieldValue.toString();
        } else if (field.type === "text") {
          valueFinal = fieldValue.toString();
        } else if (field.type === "select" && field.forceInteger) {
          valueFinal = parseInt(fieldValue);
        }
      }
      if (valueFinal !== undefined) {
        payload.push({
          settingName: fieldName,
          settingValue: valueFinal,
        });
      }
    });
    await Promise.all(promises);
    return payload;
  } catch (error) {
    console.log(error);
  }
};

export const parseDataOnSubmit = async (data: any, fields: any) => {
  const payload: any = {};
  const promises = fields.map(async (field: any) => {
    const fieldName = field.name;
    let fieldValue = data[fieldName];

    payload[fieldName] = fieldValue;

    if (fieldValue !== undefined) {
      if (field.type === "number") {
        payload[fieldName] = parseFloat(fieldValue);
      } else if (field.type === "image") {
        if (typeof fieldValue === "string" && fieldValue.includes("http")) {
          payload[fieldName] = fieldValue;
        } else {
          if (fieldValue && fieldValue.length > 0) {
            await fetch(url, {
              method: "POST",
              body: JSON.stringify(fieldValue[0].data_url),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => {
                return response.json();
              })
              .then((response) => {
                if (response) {
                  payload[fieldName] = response.url;
                } else {
                  payload[fieldName] = null;
                }
                return response;
              })
              .catch(() => {
                payload[fieldName] = null;
              });
          }
        }
      } else if (field.type === "gallery") {
        if (fieldValue && fieldValue.length > 0) {
          const imagesWithOutInBase64 = fieldValue.filter(
            (f: any) => !f.data_url,
          );
          const imagesInBase64 = fieldValue
            .filter((f: any) => f.data_url)
            .map((image: any) => image.data_url);

          if (imagesInBase64.length > 0) {
            await fetch(url, {
              method: "POST",
              body: JSON.stringify(imagesInBase64),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => {
                return response.json();
              })
              .then((response) => {
                if (response) {
                  //Add image on update without data_url
                  const imagesUpdate = fieldValue.filter(
                    (f: any) => !f.data_url,
                  );
                  payload[fieldName] = JSON.stringify(
                    response.concat(imagesUpdate),
                  );
                } else {
                  payload[fieldName] = JSON.stringify(imagesWithOutInBase64);
                }
              })
              .catch(() => {
                payload[fieldName] = null;
              });
          } else {
            payload[fieldName] = JSON.stringify(fieldValue);
          }
        } else {
          payload[fieldName] = JSON.stringify(fieldValue);
        }
      } else if (field.type === "textarea") {
        //count all images base64
        const images = fieldValue
          ? fieldValue.match(/data:image\/[^;]+;base64[^"]*/g)
          : null;
        const imagesCount = images ? images.length : 0;
        //Save each image on server and replace base64 with url
        for (let i = 0; i < imagesCount; i++) {
          //image with base64 structure
          const image = images[i];

          const response = await saveImage(JSON.stringify(image));

          if (response) {
            const responseF = await response.json();
            fieldValue = fieldValue.replace(image, responseF.url);
          } else {
            fieldValue = fieldValue.replace(image, "");
          }
        }
        payload[fieldName] = fieldValue;
      } else if (field.type === "select" && field.forceInteger) {
        payload[fieldName] = parseInt(fieldValue);
      } else if (field.type === "searchselect" && field.forceInteger) {
        payload[fieldName] = parseInt(fieldValue);
      } else if (field.type === "multiselect") {
        if (fieldValue && fieldValue.length > 0) {
          payload[fieldName] = JSON.stringify(fieldValue);
        } else {
          payload[fieldName] = null;
        }
      }
    }
  });

  await Promise.all(promises);

  return payload;
};

export const getGalleryImagesUrls = async (dataRaw) => {
  if (!dataRaw) return;
  let data;
  const imagesWithOutInBase64 = dataRaw.filter((f: any) => !f.data_url);
  const imagesInBase64 = dataRaw
    .filter((f: any) => f.data_url)
    .map((image: any) => image.data_url);

  console.log(url);

  if (imagesInBase64.length > 0) {
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(imagesInBase64),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response) {
          //Add image on update without data_url
          const newImages = response.map((image: any) => image.url);
          const imagesUpdate = dataRaw.filter((f: any) => !f.data_url);
          data = JSON.stringify(newImages.concat(imagesUpdate));
        } else {
          data = JSON.stringify(imagesWithOutInBase64);
        }
      })
      .catch((err) => {
        console.error(err);
        data = null;
      });
  } else {
    data = JSON.stringify(dataRaw);
  }

  console.log(data);

  return data;
};
