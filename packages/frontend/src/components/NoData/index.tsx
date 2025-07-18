import React from "react";
import { Typography } from "antd";
import cn from "classnames";

import { useTranslation } from "libs";

import EmptyIconImage from "../EmptyIconImage";

import { descriptionStyles, iconStyles, titleStyles, wrapperStyles } from "./style.css";

interface NoDataInterface {
  className?: string;
  title?: string;
  description?: string;
}

function NoData({ className, title, description }: NoDataInterface) {
  const t = useTranslation();
  return (
    <div className={cn(className, wrapperStyles)}>
      <EmptyIconImage className={iconStyles} />
      <Typography.Title className={titleStyles} level={5}>
        {title ?? t("common.no_data.title")}
      </Typography.Title>
      {description && <Typography.Text className={descriptionStyles}>{description}</Typography.Text>}
    </div>
  );
}

export default React.memo(NoData);
