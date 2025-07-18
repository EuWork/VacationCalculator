import React from "react";
import { observer } from "mobx-react-lite";

import { RouterProvider } from "libs";

interface OuterInterface {
  children: React.ReactNode;
  showMenu: boolean;
}

function Outer({ children }: OuterInterface) {
  return <RouterProvider>{children}</RouterProvider>;
}

export default observer(Outer);
