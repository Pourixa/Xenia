export async function getRequest(path) {
  return await fetch(import.meta.env.VITE_API_URL + path,{
        credentials:"include",
  });
}

export async function postRequest(url, data) {
  const isFormData = data instanceof FormData;

  return fetch(import.meta.env.VITE_API_URL + url, {
    method: "POST",
    headers: isFormData
      ? {}
      : { "Content-Type": "application/json" },
    credentials: "include",
    body: isFormData ? data : JSON.stringify(data),
  });
}

export async function patchRequest(path, body) {
  return await fetch(import.meta.env.VITE_API_URL + path, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials:"include",
    method:"PATCH",
    body: JSON.stringify(body),
  });
}
