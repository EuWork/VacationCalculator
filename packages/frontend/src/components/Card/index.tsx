import React from "react";
import { Card as AntCard, CardProps as AntCardProps } from "antd";
import cn from "classnames";
import { observer } from "mobx-react-lite";

import { wrapperStyles, cardStyles } from "./style.css";

export interface CardInterface {
  qa?: string;
  id?: string;
  className?: string;
  antCardClassName?: string;
  children: React.ReactNode;
  loading?: boolean;
  size?: AntCardProps["size"];
}

function Card(
  { qa, className, antCardClassName, loading, size, children }: CardInterface,
  ref: React.Ref<HTMLDivElement>,
) {
  return (
    <div data-qa={qa} ref={ref} className={cn(className, wrapperStyles)}>
      <AntCard className={cn(antCardClassName, cardStyles)} loading={loading} size={size}>
        {children}
      </AntCard>
    </div>
  );
}

export default observer(React.forwardRef(Card));
