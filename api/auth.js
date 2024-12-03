import { url } from "./configuration";

export const register = async (body) => {
  const response = await fetch(`${url}/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await response.json();
};

export const login = async (body) => {
  const response = await fetch(`${url}/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await response.json();
};

export const checkToken = async (body) => {
  const response = await fetch(`${url}/checkToken`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${body}`,
    },
  });
  return await response.json();
};


export const logout = async (body) => {
  const response = await fetch(`${url}/logout`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${body}`,
    },
    body: JSON.stringify(body),
  });
  return await response.json();
};

export const search = async (body) => {
  const response = await fetch(`${url}/search`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${body}`,
    },
    body: JSON.stringify(body),
  });
  return await response.json();
};