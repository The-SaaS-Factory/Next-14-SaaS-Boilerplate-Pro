export const stringArray = (val: any) => {
    if (typeof val === 'string' && val.startsWith('[') && val.endsWith(']')) {
        try {
            return JSON.parse(val.replace("/", ""));
        } catch (error) {
            console.error('Error parsing string to array:', error);
        }
    }

    return val
}

export function parseStringToArray(val) {
    console.log(val)
    // Verificar si es un string y tiene el formato de un array con comillas escapadas
    if (typeof val === 'string' || val.startsWith(`º`)) {
        console.log("SI ES STRING")
        try {
            // Reemplazar las comillas escapadas \" con comillas normales "
            const unescapedString = val.replace(/\\"/g, '"');

            // Convertir el string desescapado a un array usando JSON.parse
            console.log(JSON.parse(unescapedString))

            return JSON.parse(unescapedString);

        } catch (error) {
            console.error('Error parsing string to array:', error);
        }
    }

    console.log("NO ES STRING")
    console.log(val)


    // Si no cumple con el formato o falla la conversión, devolver el valor original
    return val;
}
