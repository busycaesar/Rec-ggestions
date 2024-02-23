import { getToken } from "./authenticate";

export const fetchRequest = async (
  url: string,
  method: string,
  body: {} = {},
  authentication: boolean = false
) => {
  const acceptedMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
  method = method.toUpperCase();
  if (!url || !acceptedMethods.includes(method))
    throw new Error("Invalid arguments received by the fetchRequest function!");
  let headers: any = {
    "content-type": "application/json",
  };
  if (authentication) headers.Authorization = `JWT ${getToken()}`;
  let fetchArguments: any = {
    method: method,
    headers: headers,
  };
  if (Object.keys(body).length) fetchArguments.body = JSON.stringify(body);
  const response = await fetch(url, fetchArguments);
  return response;
};
