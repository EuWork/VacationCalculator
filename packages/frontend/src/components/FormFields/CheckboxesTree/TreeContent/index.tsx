import React from "react";
import { observer } from "mobx-react-lite";
import { Tree, TreeDataNode } from "antd";
import cn from "classnames";

import { FormFieldCheckboxesTreeItem, FormFieldCheckboxesTreeValue } from "../index";
import { useChange } from "./hooks/useChange";

import { hideExpandableButtonStyles, treeStyles } from "./style.css";

interface TreeContentInterface {
  value: FormFieldCheckboxesTreeValue;
  items: FormFieldCheckboxesTreeItem[];
  searched?: boolean;
  onChange: (state: FormFieldCheckboxesTreeValue) => void;
}

function TreeContent({ value, items, searched, onChange }: TreeContentInterface) {
  const treeData = React.useMemo<TreeDataNode[]>(() => items.map(buildTreeData), [items]);
  const handleCheck = useChange(value, onChange);

  return (
    <Tree
      className={cn(treeStyles, searched && hideExpandableButtonStyles)}
      checkable
      selectable={false}
      treeData={treeData}
      checkedKeys={value}
      onCheck={handleCheck}
    />
  );
}

export default observer(TreeContent);

function buildTreeData(item: FormFieldCheckboxesTreeItem): TreeDataNode {
  return {
    title: item.label,
    key: item.value,
    children: item.children?.map(buildTreeData),
  };
}
