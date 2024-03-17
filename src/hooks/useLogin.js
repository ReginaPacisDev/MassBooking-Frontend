import { axiosFetcher, useFetcher } from "../api";

export const useLogin = (login) => {
  const path = `/auth/${login ? "login" : "signup"}`;

  return useFetcher(path, (url, body) =>
    axiosFetcher(url, {
      method: "post",
      headers: { "content-type": "application/json" },
      data: body,
      failureNotification: true,
      successNotification: true,
    })
  );
};
