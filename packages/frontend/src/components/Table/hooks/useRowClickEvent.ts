import React from "react";
import type { Reference } from "rc-table/lib/interface";
import { findElementInDOMParentTree } from "@worksolutions/utils";

import { useRow } from "./useRow";
import { type TableRowHoverInterface } from "../index";

export function useRowClickEvent(
  tableRef: React.MutableRefObject<Reference | null>,
  onClick: ((data: TableRowHoverInterface) => void) | undefined,
) {
  const handleClickEvents = React.useCallback(
    (row: HTMLElement) => {
      if (!onClick) return;
      return registerClick(row, () => {
        onClick({ element: row, id: row.getAttribute("data-row-key")! });
      });
    },
    [onClick],
  );

  useRow(tableRef, handleClickEvents);
}

function registerClick(element: HTMLElement, onClick: () => void) {
  function clickHandler(event: MouseEvent) {
    findElementInDOMParentTree(event.target as HTMLElement, (currentElement) => {
      if (currentElement === element) {
        onClick();
        return true;
      }
      if (currentElement.getAttribute("data-stop-row-click") === "true") return true;
      return false;
    });
  }

  element.addEventListener("click", clickHandler);
  return () => {
    element.removeEventListener("click", clickHandler);
  };
}
