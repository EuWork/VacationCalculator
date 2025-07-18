import React from "react";
import { RouteObject } from "react-router";
import { RenderModule } from "@app/front-modules";

import FullSizeLoader from "components/FullSizeLoader";

import { PageLoader, PageModule, PageOptions } from "./page-module";

export function createPage(path: string, load: PageLoader, options?: PageOptions): RouteObject {
  return {
    path,
    element: (
      <RenderModule key={path} Module={PageModule} loadModule={load} loadingElement={<FullSizeLoader />} {...options} />
    ),
  };
}

export type { PageLoader, PageOptions };
