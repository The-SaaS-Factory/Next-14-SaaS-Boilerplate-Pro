export const stringArray = (val: any) => {
  if (typeof val === "string" && val.startsWith("[") && val.endsWith("]")) {
    try {
      return JSON.parse(val.replace("/", ""));
    } catch (error) {
      console.error("Error parsing string to array:", error);
    }
  }

  return val;
};

export function parseStringToArray(val) {
  if (typeof val === "string" || val.startsWith(`º`)) {
    try {
      const unescapedString = val.replace(/\\"/g, '"');

      return JSON.parse(unescapedString);
    } catch (error) {
      console.error("Error parsing string to array:", error);
    }
  }

  // Si no cumple con el formato o falla la conversión, devolver el valor original
  return val;
}
