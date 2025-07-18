import React from "react";
import { Typography } from "antd";
import cn from "classnames";

import { Tooltip, TooltipInterface } from "components/Tooltip";

import { indicatorsWrapperStyles, textModeStyleVariants, textStyles, tooltipStyles, wrapperStyles } from "./style.css";

export type GanttTextCellMode = "default" | "alarm";

export interface GanttTextCellInterface {
  text: string;
  indicators?: React.ReactNode;
  mode?: GanttTextCellMode;
  tooltipMaxWidth?: TooltipInterface["maxWidth"];
  tooltipTextAlign?: TooltipInterface["textAlign"];
}

function GanttTextCell({
  text,
  indicators,
  mode = "default",
  tooltipTextAlign,
  tooltipMaxWidth,
}: GanttTextCellInterface) {
  return (
    <div className={wrapperStyles}>
      <Tooltip className={tooltipStyles} maxWidth={tooltipMaxWidth} textAlign={tooltipTextAlign} text={text}>
        <Typography.Text className={cn(textStyles, textModeStyleVariants[mode])}>{text}</Typography.Text>
      </Tooltip>
      {indicators && <div className={indicatorsWrapperStyles}>{indicators}</div>}
    </div>
  );
}

export default React.memo(GanttTextCell);
