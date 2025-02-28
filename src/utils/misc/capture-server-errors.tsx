"use client";

/**
 * Función de utilidad para capturar errores "sanitizados" que
 * vienen desde una acción del servidor.
 *
 * Se espera que la respuesta tenga la forma:
 *    { success: true, ... } o { error: "Mensaje de error" }
 *
 * Se usa en el primer then() de la promesa de la server action.
 *
 * Ejemplo de uso:
 *    serverAction(payload)
 *      .then(captureServerErrors)
 *      .then(result => {
 *         // Procesar result
 *      })
 *      .catch(error => {
 *         // Mostrar error legible al usuario
 *         toast.error(error.message);
 *      });
 */
export const captureServerErrors = <T,>(
  response: T & { error?: string },
): T => {
  if (response.error) {
    //Capture con Sentry
    //Sentry.captureMessage(response
    return response;
  }
  return response;
};
