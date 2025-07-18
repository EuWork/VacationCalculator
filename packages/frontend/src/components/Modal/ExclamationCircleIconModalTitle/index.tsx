import React from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import Typography from "components/Typography";

import { iconStyles, titleStyles, wrapperStyles } from "./style.css";

interface TitleInterface {
  title: string;
}

function ExclamationCircleIconModalTitle({ title }: TitleInterface) {
  return (
    <div className={wrapperStyles}>
      <ExclamationCircleOutlined className={iconStyles} />
      <Typography type="h5" className={titleStyles}>
        {title}
      </Typography>
    </div>
  );
}

export default React.memo(ExclamationCircleIconModalTitle);
