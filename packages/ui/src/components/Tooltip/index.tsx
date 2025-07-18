import React from "react";
import { Tooltip as AntTooltip } from "antd";
import cn from "classnames";
import { isNil } from "@worksolutions/utils";
import { TooltipPlacement, TooltipRef as AntTooltipRef } from "antd/es/tooltip";
import type { AlignType } from "@rc-component/trigger";

import { tooltipMaxWidthStyleVariants, tooltipStyles, tooltipTextAlignStyleVariants } from "./style.css";

export type TooltipAlign = TooltipPlacement;
export type TooltipPosition = AlignType;
export type TooltipRef = AntTooltipRef;

export interface TooltipInterface {
  className?: string;
  text: string | null;
  textAlign?: "left" | "center" | "right";
  children: React.ReactNode;
  maxWidth?: 250 | null;
  forceOpened?: boolean;
  align?: TooltipAlign;
  position?: TooltipPosition;
}

function Tooltip(
  { className, forceOpened, text, textAlign, maxWidth = 250, align, children, position, ...props }: TooltipInterface,
  ref: React.Ref<TooltipRef>,
) {
  if (!text) return children;
  return (
    <AntTooltip
      {...props}
      ref={ref}
      open={forceOpened}
      placement={align}
      rootClassName={cn(
        className,
        tooltipStyles,
        textAlign && tooltipTextAlignStyleVariants[textAlign],
        isNil(maxWidth) ? tooltipMaxWidthStyleVariants.unset : tooltipMaxWidthStyleVariants[maxWidth],
      )}
      title={text}
      align={position}
      destroyTooltipOnHide
    >
      {children}
    </AntTooltip>
  );
}

const MemoTooltip = React.memo(React.forwardRef(Tooltip));

export { MemoTooltip as Tooltip };
