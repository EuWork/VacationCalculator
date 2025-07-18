import { Tooltip } from "@app/ui";
import React from "react";

import { tooltipTriggerStyles } from "./style.css";

interface FirstColumnTooltipInterface {
  index: number;
  text: string | null;
}

function FirstColumnTooltip({ index, text }: FirstColumnTooltipInterface) {
  if (index !== 0) return null;
  return (
    <Tooltip text={text} align="right">
      <div className={tooltipTriggerStyles} />
    </Tooltip>
  );
}

export default React.memo(FirstColumnTooltip);
