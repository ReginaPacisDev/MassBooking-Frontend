import Axios from "axios";

const instance = Axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 40000,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json; charset=utf-8",
  },
  responseType: "json",
});

export const axiosFetcher = async (url, config) => {
  const { method, useAccessToken, data } = config;

  return instance({
    url,
    method,
    ...(data && {
      data,
    }),
    ...(useAccessToken && {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    }),
  });
};
