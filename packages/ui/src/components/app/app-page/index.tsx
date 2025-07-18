import React from "react";
import { Layout, Typography } from "antd";
import cn from "classnames";

import { contentWrapperStyles, titleStyles } from "./style.css";

export interface UiPageInterface {
  className?: string;
  titleClassName?: string;
  beforeTitle?: React.ReactNode;
  pageName: React.ReactNode;
  children: React.ReactNode;
}

function UiPageComponent({ className, titleClassName, beforeTitle, pageName, children }: UiPageInterface) {
  return (
    <Layout data-qa="page-component" className={cn(className, contentWrapperStyles, "ui-page-component-layout")}>
      {beforeTitle}
      <Typography.Title data-qa="title" className={cn(titleClassName, titleStyles)} level={2}>
        {pageName}
      </Typography.Title>
      {children}
    </Layout>
  );
}

export const UiPage = React.memo(UiPageComponent);
