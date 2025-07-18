import React from "react";
import cn from "classnames";

import Typography from "components/Typography";
import type { BarValue, RenderValueType } from "components/RatioIndicator/types";

import {
  valueStyleVariants,
  valueStyles,
  valueTextStyleVariants,
  valueTextStyles,
  valueWithTooltipStyles,
} from "./styles.css";

interface ValueInterface {
  value: BarValue;
  isBeforeMid: boolean;
  RenderValue?: RenderValueType;
  equal?: boolean;
}

function Value({ value, isBeforeMid, RenderValue, equal, ...props }: ValueInterface) {
  return (
    <div
      {...props}
      className={cn(
        valueStyles,
        value.position === "top" && valueStyleVariants.top,
        value.position === "bottom" && valueStyleVariants.bottom,
        equal && valueStyleVariants.equal,
        isBeforeMid ? valueTextStyleVariants.beforeMid : valueTextStyleVariants.afterMid,
        value.tooltip && valueWithTooltipStyles,
      )}
    >
      {RenderValue ? (
        <RenderValue value={value.value} index={value.valueIndex} />
      ) : (
        <Typography strong type="span-2" className={valueTextStyles}>
          {value.value}
        </Typography>
      )}
    </div>
  );
}

export default React.memo(Value);
