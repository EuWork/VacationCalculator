import React, { useMemo } from "react";
import { theme } from "antd";
import cn from "classnames";
import { isNil } from "@worksolutions/utils";
import { Tooltip } from "@app/ui";
import { decimalNumberFormat } from "@app/kit";

import { numberToHundredsK } from "libs";

import Typography from "components/Typography";

import type { BarsViewInterface } from "../../types";
import { BarsLibs } from "./libs";
import Bar from "./Bar";

import { legendStyles, barsWrapperStyles, barsWrapperWithLegendStyles, wrapperStyles } from "./style.css";

interface BarsViewComponentInterface extends BarsViewInterface {
  width: number;
}

function BarsView({ ranges, values, width, RenderValue, legendValues }: BarsViewComponentInterface) {
  const { token } = theme.useToken();
  const barsLibs = useMemo(() => new BarsLibs({ ranges, values, width, token }), [ranges, values, width, token]);

  return (
    <div className={wrapperStyles}>
      <div className={cn(barsWrapperStyles, !isNil(legendValues) && barsWrapperWithLegendStyles)}>
        {barsLibs.barsData.map((data, index) => (
          <Bar key={index} {...data} RenderValue={RenderValue} />
        ))}
      </div>

      {!isNil(legendValues) && (
        <div className={legendStyles}>
          {legendValues.map((value, index) => (
            <Tooltip
              key={index}
              text={decimalNumberFormat({ language: "ru" }, value, {
                maximumFractionDigits: 2,
              })}
            >
              <Typography type="span-2" variant="secondary">
                {numberToHundredsK(value)}
              </Typography>
            </Tooltip>
          ))}
        </div>
      )}
    </div>
  );
}

export default React.memo(BarsView);
