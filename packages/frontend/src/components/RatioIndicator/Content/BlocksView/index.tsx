import React, { useMemo } from "react";
import { theme } from "antd";

import type { BlocksViewInterface } from "../../types";
import Block from "./Block";
import { ColorLibs } from "../libs";

import { wrapperStyles } from "./style.css";

function BlocksView({ values, RenderValue }: BlocksViewInterface) {
  const { token } = theme.useToken();

  const colorLibs = useMemo(() => new ColorLibs({ token }), [token]);

  return (
    <div className={wrapperStyles}>
      {values.map(({ value, tooltip }, index) => (
        <Block
          key={index}
          value={value}
          tooltipText={tooltip}
          isFirstBlock={index === 0}
          isLastBlock={index === values.length - 1}
          gradient={colorLibs.gradients[index]}
          RenderValue={RenderValue}
          valueIndex={index}
        />
      ))}
    </div>
  );
}

export default React.memo(BlocksView);
