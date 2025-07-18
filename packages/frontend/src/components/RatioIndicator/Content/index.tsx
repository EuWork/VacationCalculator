import React from "react";
import cn from "classnames";

import BarsView from "./BarsView";
import BlocksView from "./BlocksView";
import type { BarsViewInterface, BlocksViewInterface } from "../types";

import { wrapperStyles } from "./style.css";

export type RatioIndicatorContentInterface = {
  className?: string;
  width: number;
} & (BarsViewInterface | BlocksViewInterface);

function RatioIndicatorContent(
  { className, ...props }: RatioIndicatorContentInterface,
  ref: React.Ref<HTMLDivElement>,
) {
  return (
    <div ref={ref} className={cn(wrapperStyles, className)}>
      {props.type === "bars" && props.ranges.length === 6 && <BarsView {...props} />}
      {props.type === "blocks" && props.values.length === 5 && <BlocksView {...props} />}
    </div>
  );
}

export default React.memo(React.forwardRef(RatioIndicatorContent));
