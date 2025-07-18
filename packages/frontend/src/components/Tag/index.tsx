import React from "react";
import { Tag as AntTag } from "antd";
import cn from "classnames";

import { defaultIconByColor, icons } from "./presets";

import { iconStyles, tagStyles } from "./style.css";

interface TagInterface {
  className?: string;
  text: React.ReactNode;
  icon?: keyof typeof icons | true;
  color: keyof typeof defaultIconByColor;
}

function Tag({ className, color, text, icon }: TagInterface) {
  const Icon = icon === undefined ? null : icon === true ? defaultIconByColor[color] : icons[icon];

  return (
    <AntTag className={cn(className, tagStyles)} color={color}>
      {Icon && <Icon className={iconStyles} />}
      {text}
    </AntTag>
  );
}

export default React.memo(Tag);
