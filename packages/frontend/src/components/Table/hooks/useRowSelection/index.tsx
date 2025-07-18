import React from "react";
import type { TableRowSelection } from "antd/es/table/interface";

import { disabledCheckboxStyles } from "./style.css";

interface UseRowSelectionInterface {
  selectableIds: string[] | undefined;
  selectedIds: string[] | undefined;
  onChangeSelected: ((selectedIds: string[]) => void) | undefined;
}

export function useRowSelection({ selectableIds, selectedIds, onChangeSelected }: UseRowSelectionInterface) {
  return React.useMemo<TableRowSelection | undefined>(() => {
    if ((selectableIds?.length ?? 0) === 0 || !selectedIds || !onChangeSelected) return undefined;
    return {
      type: "checkbox",
      selectedRowKeys: selectedIds,
      checkStrictly: false,
      columnWidth: 32,
      onChange: (selectedRowKeys) => onChangeSelected(selectedRowKeys as string[]),
      getCheckboxProps: (record) => {
        const disabled = !selectableIds!.includes(record.id);
        return {
          disabled,
          className: disabled ? disabledCheckboxStyles : undefined,
        };
      },
    };
  }, [onChangeSelected, selectableIds, selectedIds]);
}
