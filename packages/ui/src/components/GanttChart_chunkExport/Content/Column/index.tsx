import React from "react";
import cn from "classnames";

import { columnFixedLeftStyles, columnStyles } from "./style.css";

export interface ColumnInterface {
  className?: string;
  children: React.ReactNode;
  width: number;
  fixedLeft?: boolean;
}

function Column({ className, fixedLeft, width, children }: ColumnInterface) {
  const style = React.useMemo(() => ({ width: width + "px" }), [width]);
  return (
    <div style={style} className={cn(className, columnStyles, fixedLeft && columnFixedLeftStyles)}>
      {children}
    </div>
  );
}

export default React.memo(Column);
