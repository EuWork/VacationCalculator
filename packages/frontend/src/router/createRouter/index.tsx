import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";

import { NativeRouter } from "libs";

import { createPage, PageLoader, PageOptions } from "../createPage";
import Wrapper from "./wrapper";

interface ConfigItem {
  path: string;
  load: PageLoader;
  options?: PageOptions;
}

export function createRouter(config: ConfigItem[]) {
  const router = createBrowserRouter(config.map((item) => createPage(item.path, item.load, item.options)));
  return { router, RouterComponent: () => <RouterComponent router={router} /> };
}

function RouterComponent({ router }: { router: NativeRouter }) {
  return (
    <Wrapper>
      <RouterProvider router={router} />
    </Wrapper>
  );
}
