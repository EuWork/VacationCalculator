import React from "react";
import type { ExpandableConfig } from "rc-table/lib/interface";

interface UseExpandableInterface {
  expandable: boolean | undefined;
  expandedIds: string[] | undefined;
  onChangeExpanded: ((expandedIds: string[]) => void) | undefined;
}

type Config = ExpandableConfig<{}>;

export function useExpandable({ expandable, expandedIds, onChangeExpanded }: UseExpandableInterface) {
  const handleExpandedRowsChange = React.useCallback(
    (keys: readonly React.Key[]) => onChangeExpanded?.(keys as string[]),
    [onChangeExpanded],
  );

  return React.useMemo<Config | undefined>(() => {
    if (!expandable) return undefined;
    if (!expandedIds) return defaultConfig;
    return { ...defaultConfig, expandedRowKeys: expandedIds, onExpandedRowsChange: handleExpandedRowsChange };
  }, [expandable, expandedIds, handleExpandedRowsChange]);
}

const defaultConfig: Config = { childrenColumnName: "__children", indentSize: 20 };
