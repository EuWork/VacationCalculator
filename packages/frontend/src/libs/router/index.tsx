import React from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import { createBrowserRouter, useSearchParams } from "react-router-dom";
import { useSyncToRef } from "@worksolutions/react-utils";

import { createNewUrl } from "./createUrl";

export type RouterQuery = Record<string, string | undefined>;

export interface RouterInterface<QUERY extends RouterQuery = RouterQuery> {
  pathname: string;
  query: QUERY;
  push: (url: string, params?: RouterQuery) => void;
  replace: (url: string, params?: RouterQuery) => void;
  nativePush: (url: string) => void;
}

function useCreateRouter(): RouterInterface {
  const params = useParams() as RouterQuery;
  const [urlSearchParams] = useSearchParams();
  const searchParams = React.useMemo(() => Object.fromEntries(urlSearchParams.entries()), [urlSearchParams]);
  const query = React.useMemo(() => ({ ...params, ...searchParams }), [params, searchParams]);
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const handlePush = React.useCallback(
    (url: string, params?: RouterQuery) => navigate(createNewUrl(url, params)),
    [navigate],
  );

  const handleNativePush = React.useCallback((url: string) => (document.location.href = url), []);

  const handleReplace = React.useCallback(
    (url: string, params?: RouterQuery) => navigate(createNewUrl(url, params), { replace: true }),
    [navigate],
  );

  return React.useMemo(
    () => ({ push: handlePush, nativePush: handleNativePush, replace: handleReplace, query, pathname }),
    [handlePush, handleReplace, handleNativePush, pathname, query],
  );
}

const Context = React.createContext<RouterInterface>(null!);

export function RouterProvider({ children }: React.PropsWithChildren) {
  const router = useCreateRouter();
  return <Context.Provider value={router}>{children}</Context.Provider>;
}

export function useRouter<QUERY extends RouterQuery>(): RouterInterface {
  return React.useContext(Context) as RouterInterface<QUERY>;
}

export function useRouterProxyRef() {
  const router = useRouter();
  const routerRef = useSyncToRef(router);

  return React.useMemo(
    () =>
      new Proxy(routerRef, {
        get: (target, key) => target.current[key as keyof typeof target.current],
      }),
    [routerRef],
  );
}

export type NativeRouter = ReturnType<typeof createBrowserRouter>;
