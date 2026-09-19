export async function getRequest(path) {
  return await fetch(import.meta.env.VITE_API_URL + path,{
        credentials:"include",
  });
}

export async function postRequest(path, body) {
  return await fetch(import.meta.env.VITE_API_URL + path, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials:"include",
    method:"post",
    body: JSON.stringify(body),
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
