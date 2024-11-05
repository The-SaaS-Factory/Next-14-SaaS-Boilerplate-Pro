export async function downloadRepositoryZip(repoName: string) {
  console.log(repoName);

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Asegúrate de tener este token en tus variables de entorno
  const ORG_NAME = process.env.GITHUB_ORG; // Nombre de tu organización en GitHub

  if (!GITHUB_TOKEN || !ORG_NAME) {
    throw new Error(
      "Configura las variables de entorno GITHUB_TOKEN y GITHUB_ORG",
    );
  }

  const response = await fetch(
    `https://api.github.com/repos/${ORG_NAME}/${repoName}/zipball/main`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Error al descargar el repositorio: ${response.statusText}`,
    );
  }

  const blob = await response.blob();
  return blob;
}
