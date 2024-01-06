export const fetchRequest = async (url: string, method: string, body: {}) => {
  const acceptedMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
  method = method.toUpperCase();
  if (!url || !acceptedMethods.includes(method) || !body)
    throw new Error("Invalid arguments received by the fetchRequest function!");
  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(body),
    headers: { "content-type": "application/json" },
  });
  return response;
};
