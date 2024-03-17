import { useState, useMemo, useCallback, useRef } from "react";
import { unstable_batchedUpdates as batchedUpdates } from "react-dom";

export const useLatestRef = (value) => {
  const ref = useRef(value);
  ref.current = value;
  return ref;
};

export const useFetcher = (key, fetcher) => {
  const [isValidating, setIsValidating] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState();

  const keyRef = useLatestRef(key);
  const fetcherRef = useLatestRef(fetcher);
  const fire = useCallback(
    async (...params) => {
      setIsValidating(true);
      try {
        const response = await fetcherRef.current(keyRef.current, ...params);
        batchedUpdates(() => {
          setData(response);
          setError(undefined);
          setIsValidating(false);
        });
        return response;
      } catch (error) {
        batchedUpdates(() => {
          setData(undefined);
          setError(error);
          setIsValidating(false);
        });
        throw error;
      }
    },
    [keyRef, fetcherRef]
  );

  const payload = useMemo(
    () => ({
      data,
      error,
      isValidating,
    }),
    [data, error, isValidating]
  );

  return [payload, fire];
};
