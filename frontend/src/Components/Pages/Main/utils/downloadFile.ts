export const downloadFile = (data: any) => {
  const url = `${process.env.REACT_APP_SERVER_URL}/get-file/${data}`;
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", data);
  document.body.appendChild(link);
  link.click();
  URL.revokeObjectURL(url);
  document.body.removeChild(link);
};
