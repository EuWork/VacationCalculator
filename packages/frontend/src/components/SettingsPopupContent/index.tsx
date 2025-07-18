import React from "react";
import cn from "classnames";

import { actionsWrapperStyles, contentWrapperStyles, wrapperStyles } from "./style.css";

export interface SettingsPopupContentInterface {
  className?: string;
  children: React.ReactNode;
  actions: React.ReactNode;
  actionsClassName?: string;
}

function SettingsPopupContent(
  { className, children, actions, actionsClassName, ...props }: SettingsPopupContentInterface,
  ref: React.Ref<HTMLDivElement>,
) {
  return (
    <div {...props} ref={ref} className={cn(className, wrapperStyles)}>
      <div className={contentWrapperStyles}>{children}</div>
      <div className={cn(actionsWrapperStyles, actionsClassName)}>{actions}</div>
    </div>
  );
}

export default React.memo(React.forwardRef(SettingsPopupContent));
