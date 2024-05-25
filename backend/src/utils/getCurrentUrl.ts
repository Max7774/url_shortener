export const getUrlWithUuid = (uuid: string) => {
  return `${process.env.SERVER_URL}${uuid}`;
};
