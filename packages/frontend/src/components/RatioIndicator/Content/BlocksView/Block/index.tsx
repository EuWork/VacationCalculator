import React, { useMemo } from "react";
import cn from "classnames";
import { Tooltip } from "@app/ui";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { theme } from "antd";

import Typography from "components/Typography";

import { RenderValueType } from "../../../types";

import {
  blockStyles,
  blockTooltipStyles,
  blockWidth,
  emptyBackgroundColor,
  blockBackground,
  emptySpaceFirstBlockStyles,
  emptySpaceStyles,
  blockStyleVariants,
  circleExternalStyles,
  circleStyles,
  circleStyleVariants,
} from "./style.css";

interface BlockInterface {
  tooltipText?: string;
  value: number;
  isFirstBlock: boolean;
  isLastBlock: boolean;
  gradient: string;
  RenderValue?: RenderValueType;
  valueIndex: number;
}

function Block({ tooltipText, value, isFirstBlock, isLastBlock, gradient, RenderValue, valueIndex }: BlockInterface) {
  const { token } = theme.useToken();

  const style = useMemo(
    () =>
      assignInlineVars({
        [blockWidth]: `${value}%`,
        [blockBackground]: gradient,
        [emptyBackgroundColor]: token.colorBgContainer,
      }),
    [gradient, token.colorBgContainer, value],
  );

  return (
    <Tooltip text={tooltipText ?? null}>
      <div
        className={cn(
          blockStyles,
          isFirstBlock && blockStyleVariants.firstBlock,
          isLastBlock && blockStyleVariants.lastBlock,
          tooltipText && blockTooltipStyles,
        )}
        style={style}
      >
        {RenderValue ? (
          <RenderValue value={value} index={valueIndex} />
        ) : (
          <Typography type="span-2">{value}</Typography>
        )}
        <div className={cn(emptySpaceStyles, isFirstBlock && emptySpaceFirstBlockStyles)} />
        <div className={cn(circleStyles, circleStyleVariants.top, isFirstBlock && circleExternalStyles)} />
        <div className={cn(circleStyles, circleStyleVariants.bottom, isFirstBlock && circleExternalStyles)} />
      </div>
    </Tooltip>
  );
}

export default React.memo(Block);
