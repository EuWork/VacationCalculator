import React from "react";
import cn from "classnames";

import { useVisible } from "../../_common/useVisible";
import { GanttChartDatasetMode } from "../../types";

import {
  wrapperDisabledStyles,
  wrapperModeStyleVariants,
  wrapperPointerStyles,
  wrapperStyles,
  wrapperVisibleStyles,
} from "./style.css";

export interface CellInterface {
  className?: string;
  width: number;
  height: number;
  children: React.ReactNode;
  href?: string;
  disabled?: boolean;
  mode: GanttChartDatasetMode;
  onClick?: () => void;
}

function Cell({ className, width, height, children, href, disabled, mode, onClick }: CellInterface) {
  const [visible, setElement] = useVisible(false);
  const style = React.useMemo(() => ({ width: width + "px", height: height + "px" }), [height, width]);

  const resultClassName = cn(
    className,
    wrapperStyles,
    visible && wrapperVisibleStyles,
    onClick && wrapperPointerStyles,
    disabled && wrapperDisabledStyles,
    wrapperModeStyleVariants[mode],
  );

  if (href && !disabled)
    return (
      <a ref={setElement} style={style} className={resultClassName} href={href} onClick={onClick}>
        {children}
      </a>
    );

  return (
    <div ref={setElement} style={style} className={resultClassName} onClick={onClick}>
      {children}
    </div>
  );
}

export default React.memo(Cell);
