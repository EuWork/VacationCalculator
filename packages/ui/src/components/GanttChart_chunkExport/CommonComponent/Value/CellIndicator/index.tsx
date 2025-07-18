import React from "react";
import cn from "classnames";

import { Tooltip, TooltipInterface } from "components/Tooltip";

import { colorStyleVariants, tooltipStyles, wrapperOutlinedStyles, wrapperStyles } from "./style.css";

export type GanttCellIndicatorColor = "error" | "warning" | "success" | "inProgress";

export interface GanttCellIndicatorInterface {
  className?: string;
  icon: React.ReactNode;
  color: GanttCellIndicatorColor;
  outlined?: boolean;
  tooltipText?: string;
  tooltipMaxWidth?: TooltipInterface["maxWidth"];
  tooltipTextAlign?: TooltipInterface["textAlign"];
}

function GanttCellIndicator({
  className,
  icon,
  color,
  outlined,
  tooltipText,
  tooltipMaxWidth,
  tooltipTextAlign,
}: GanttCellIndicatorInterface) {
  const content = (
    <div className={cn(className, wrapperStyles, colorStyleVariants[color], outlined && wrapperOutlinedStyles)}>
      {icon}
    </div>
  );
  if (tooltipText)
    return (
      <Tooltip className={tooltipStyles} text={tooltipText} maxWidth={tooltipMaxWidth} textAlign={tooltipTextAlign}>
        {content}
      </Tooltip>
    );
  return content;
}

export default React.memo(GanttCellIndicator);
