import React from "react";
import { Tabs as AntTabs } from "antd";
import type { Tab as AntTab } from "rc-tabs/lib/interface";
import cn from "classnames";

import { tabsStyles } from "./style.css";

export interface TabItem<KEY extends string> {
  tab: KEY;
  title: React.ReactNode;
  disabled?: boolean;
  children?: React.ReactNode;
}

interface TabsInterface<KEYS extends string> {
  qa?: string;
  className?: string;
  rootClassName?: string;
  activeTab: KEYS | null;
  tabs: TabItem<KEYS>[];
  onChange: (tab: KEYS) => void;
}

function Tabs<KEYS extends string>({ qa, className, rootClassName, activeTab, tabs, onChange }: TabsInterface<KEYS>) {
  const handleChange = React.useCallback((id: string) => onChange(id as KEYS), [onChange]);
  const options = React.useMemo<AntTab[]>(
    () => tabs.map((tab) => ({ key: tab.tab, label: tab.title, disabled: tab.disabled, children: tab.children })),
    [tabs],
  );

  return (
    <AntTabs
      data-qa={qa}
      className={cn(className, tabsStyles)}
      rootClassName={rootClassName}
      activeKey={activeTab ?? undefined}
      destroyInactiveTabPane
      items={options}
      onChange={handleChange}
    />
  );
}

export default React.memo(Tabs);
