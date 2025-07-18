import React, { useMemo } from "react";
import cn from "classnames";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { Tooltip } from "@app/ui";

import { BarValue, RenderValueType } from "../../../types";
import Value from "./Value";

import {
  barBackgroundColor,
  barStyles,
  wrapperStyleVariants,
  wrapperTransformStyleVariants,
  wrapperOpacityStyles,
  wrapperStyles,
  equalStyleVariants,
} from "./style.css";

export interface BarInterface {
  index: number;
  value?: BarValue;
  bar: number;
  backgroundColor: string;
  isBeforeMid: boolean;
  isOpacity: boolean;
  RenderValue?: RenderValueType;
}

function Bar({ value, isOpacity, backgroundColor, isBeforeMid, RenderValue }: BarInterface) {
  const style = useMemo(() => assignInlineVars({ [barBackgroundColor]: backgroundColor }), [backgroundColor]);

  return (
    <div className={cn(wrapperStyles, isOpacity && wrapperOpacityStyles)} style={style}>
      <div
        className={cn(
          barStyles,
          value ? wrapperStyleVariants.value : wrapperStyleVariants.bar,
          value?.position === "bottom" && !value.equal && wrapperTransformStyleVariants.bottom,
          value?.position === "top" && !value.equal && wrapperTransformStyleVariants.top,
          value?.equal && equalStyleVariants.top,
        )}
      >
        <Tooltip text={value?.tooltip ?? null} align={value?.position}>
          {value && <Value value={value} isBeforeMid={isBeforeMid} RenderValue={RenderValue} />}
        </Tooltip>
      </div>

      {value?.afterChangesValue && (
        <div className={cn(barStyles, wrapperStyleVariants.equal, equalStyleVariants.bottom)}>
          <Tooltip text={value.afterChangesValue.tooltip ?? null} align="bottom">
            <Value value={value.afterChangesValue} isBeforeMid={isBeforeMid} RenderValue={RenderValue} equal />
          </Tooltip>
        </div>
      )}
    </div>
  );
}

export default React.memo(Bar);
