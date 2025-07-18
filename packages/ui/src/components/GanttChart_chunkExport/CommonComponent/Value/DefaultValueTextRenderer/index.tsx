import React from "react";
import cn from "classnames";
import { Typography } from "antd";

import { Tooltip, TooltipInterface } from "components/Tooltip";

import {
  textStyles,
  tooltipStyles,
  defaultWrapperColorStyleVariants,
  wrapperStyles,
  dashedWrapperColorStyleVariants,
  wrapperSizeStyleVariants,
} from "./style.css";

export interface GanttDefaultValueTextRendererInterface {
  className?: string;
  text: string;
  color: "primary" | "error";
  dashed?: boolean;
  paddingStart?: boolean;
  paddingEnd?: boolean;
  tooltipText?: string;
  tooltipMaxWidth?: TooltipInterface["maxWidth"];
  tooltipTextAlign?: TooltipInterface["textAlign"];
}

function GanttDefaultValueTextRenderer({
  className,
  text,
  color,
  dashed,
  paddingStart = true,
  paddingEnd = true,
  tooltipText,
  tooltipMaxWidth,
  tooltipTextAlign,
}: GanttDefaultValueTextRendererInterface) {
  const content = (
    <div
      className={cn(
        className,
        wrapperStyles,
        dashed ? dashedWrapperColorStyleVariants[color] : defaultWrapperColorStyleVariants[color],
        paddingStart && paddingEnd && wrapperSizeStyleVariants.leftRight,
        paddingStart && !paddingEnd && wrapperSizeStyleVariants.left,
        !paddingStart && paddingEnd && wrapperSizeStyleVariants.right,
        !paddingStart && !paddingEnd && wrapperSizeStyleVariants.none,
      )}
    >
      <Typography className={textStyles}>{text}</Typography>
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

export default React.memo(GanttDefaultValueTextRenderer);
