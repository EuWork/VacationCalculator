import React from "react";
import cn from "classnames";
import { Tooltip } from "@app/ui";
import { isNil } from "@worksolutions/utils";

import type { TableCellRenderer } from "../../renderer-types";

import {
  wrapperAlignStyleVariants,
  wrapperColorStyleVariants,
  wrapperStyles,
  wrapperWithTooltipStyles,
} from "./style.css";

type RendererWrapperInterface = TableCellRenderer<unknown, { className?: string; children: React.ReactNode }>;

const RendererWrapper: RendererWrapperInterface = ({ className, value, icon, tooltip, alignment, error, children }) => {
  if (isNil(value)) return null;

  const child = (
    <div
      className={cn(
        className,
        wrapperStyles,
        error && wrapperColorStyleVariants.error,
        alignment && wrapperAlignStyleVariants[alignment as keyof typeof wrapperAlignStyleVariants],
        tooltip && wrapperWithTooltipStyles,
      )}
    >
      {icon && <div>{icon}</div>}
      {children}
    </div>
  );

  if (tooltip) return <Tooltip text={tooltip}>{child}</Tooltip>;
  return child;
};

export default React.memo(RendererWrapper);
