import React from "react";
import { Switch, Typography } from "antd";

import { useTranslation } from "libs";

import { wrapperStyles } from "./style.css";

interface ModeSwitcherInterface {
  isInterval: boolean | undefined;
  text: string | undefined;
  onChange: (isInterval: boolean) => void;
}

function ModeSwitcher({ text, isInterval, onChange }: ModeSwitcherInterface) {
  const t = useTranslation();
  const handleClick = React.useCallback(() => onChange(!isInterval), [isInterval, onChange]);

  return (
    <div className={wrapperStyles} onClick={handleClick}>
      <Switch value={isInterval ?? false} size="small" />
      <Typography.Text>{text ?? t("common.table_filters.date.mode_switcher.interval_text")}</Typography.Text>
    </div>
  );
}

export default React.memo(ModeSwitcher);
