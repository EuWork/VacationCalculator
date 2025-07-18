import React from "react";
import cn from "classnames";

import Cell, { CellInterface } from "../Cell";

import { cellStyles } from "./style.css";

function HeaderCell({ className, ...props }: CellInterface) {
  return <Cell {...props} width={props.width + 1} className={cn(className, cellStyles)} />;
}

export default React.memo(HeaderCell);
