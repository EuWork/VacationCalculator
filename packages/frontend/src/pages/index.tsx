import React from "react";

import { createRouter } from "router";

import { CommonModules } from "./common-modules";

const { router, RouterComponent } = createRouter([{ path: "/", load: () => import("./home") }]);

function Pages() {
  return (
    <>
      <CommonModules router={router} />
      <RouterComponent />
    </>
  );
}

export default React.memo(Pages);
