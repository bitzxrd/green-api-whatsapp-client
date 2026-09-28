export const getApiUrl = (idInstance: string) =>
  `https://${idInstance.slice(0, 4)}.api.green-api.com`;
