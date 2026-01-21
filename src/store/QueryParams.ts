import { useState, useEffect, useCallback } from "react";

export const useQueryParam = (
  queryDelimiter: string,
  queryValue: string = "",
): [string, (val: string) => void] => {
  const [urlParameters, setURLParameters] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return params.get(queryDelimiter) || queryValue;
    }
    return queryValue;
  });

  const setQueryValue = useCallback(
    (newQuery: string) => {
      setURLParameters(newQuery);
      const url = new URL(window.location.href);

      if (newQuery) {
        url.searchParams.set(queryDelimiter, newQuery);
      } else {
        url.searchParams.delete(queryDelimiter);
      }

      window.history.pushState({}, "", url.toString());
    },
    [queryDelimiter],
  );

  useEffect(() => {
    const onPopState = () => {
      const params = new URLSearchParams(window.location.search);
      setURLParameters(params.get(queryDelimiter) || queryValue);
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [queryDelimiter, queryValue]);

  return [urlParameters, setQueryValue];
};
