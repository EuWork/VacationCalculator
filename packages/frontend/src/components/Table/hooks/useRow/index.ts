import React from "react";
import type { Reference } from "rc-table/lib/interface";

import { waitForTable } from "./libs/waitForTable";
import { getTableBody, getTableRows } from "./libs/getTable";

export type TableRef = React.MutableRefObject<Reference | null>;

export function useRow(tableRef: TableRef, runForEveryRow: (element: HTMLElement, index: number) => Function | void) {
  const handleTableBody = React.useCallback(
    (body: Element) => {
      let disposers = getTableRows(body).map(runForEveryRow);
      const observer = new MutationObserver(() => {
        disposers.forEach((call) => call?.());
        disposers = getTableRows(body).map(runForEveryRow);
      });
      observer.observe(body, { childList: true });
      return () => {
        disposers.forEach((call) => call?.());
        observer.disconnect();
      };
    },
    [runForEveryRow],
  );

  React.useEffect(() => {
    const disposers: Function[] = [];
    const dispose = waitForTable(tableRef, 5000, (table) => disposers.push(handleTableBody(getTableBody(table))));
    disposers.push(dispose);
    return () => disposers.forEach((call) => call());
  }, [handleTableBody, tableRef]);
}

export { waitForTable };
