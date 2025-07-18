import React from "react";
import { Typography as AntTypography } from "antd";
import cn from "classnames";
import type { BaseType } from "antd/es/typography/Base";

import { maxRowsStyles, maxRowsStyleVariants, spanStyleVariants, titleStyles } from "./style.css";

export interface TypographyInterface {
  className?: string;
  children: React.ReactNode;
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "span" | "span-2";
  variant?: BaseType;
  strong?: boolean;
  maxRows?: keyof typeof maxRowsStyleVariants;
}

function Typography({ className, children, type = "span", variant, strong, maxRows, ...props }: TypographyInterface) {
  const commonClassName = cn(className, maxRows !== undefined && [maxRowsStyles, maxRowsStyleVariants[maxRows]]);

  if (type.startsWith("span"))
    return (
      <AntTypography.Text
        {...props}
        className={cn(commonClassName, spanStyleVariants[type as keyof typeof spanStyleVariants])}
        type={variant}
        strong={strong}
      >
        {children}
      </AntTypography.Text>
    );

  const level = parseInt(type.slice(1)) as Exclude<AntTitleProps["level"], undefined>;
  return (
    <AntTypography.Title {...props} className={cn(commonClassName, titleStyles)} level={level} type={variant}>
      {children}
    </AntTypography.Title>
  );
}

export default React.memo(Typography);

type AntTitleProps = Parameters<typeof AntTypography.Title>[0];
