import React from "react";
import { Popover } from "antd";
import { AbstractTooltipProps, TooltipPlacement } from "antd/es/tooltip";
import type { ActionType, AlignType } from "@rc-component/trigger/lib/interface";

import PopoverMaxSize from "./MaxSize";

export type PopupTrigger = ActionType;
export type PopupPlacement = TooltipPlacement;
export type PopupPosition = AlignType;
export type PopupArrow = AbstractTooltipProps["arrow"];

export interface PopupInterface {
  rootClassName?: string;
  popupElement: React.ReactNode;
  triggerElement: React.ReactNode;
  arrow?: PopupArrow;
  placement: PopupPlacement;
  position?: PopupPosition;
  trigger: PopupTrigger;
  opened?: boolean;
  zIndex?: number;
  minHeight?: number;
  onChangeOpened?: (opened: boolean) => void;
}

function PopupComponent({
  rootClassName,
  popupElement,
  triggerElement,
  placement,
  arrow = false,
  trigger,
  opened,
  zIndex,
  position,
  minHeight,
  onChangeOpened,
}: PopupInterface) {
  return (
    <PopoverMaxSize minHeight={minHeight}>
      <Popover
        rootClassName={rootClassName}
        open={opened}
        content={popupElement}
        arrow={arrow}
        placement={placement}
        trigger={trigger}
        zIndex={zIndex}
        align={position}
        onOpenChange={onChangeOpened}
      >
        {triggerElement}
      </Popover>
    </PopoverMaxSize>
  );
}

export const Popup = React.memo(PopupComponent);

export * from "./MaxSizeCalculator";
