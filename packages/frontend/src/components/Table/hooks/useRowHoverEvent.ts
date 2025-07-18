import React from "react";
import debounce from "lodash.debounce";

import { TableRef, useRow } from "./useRow";
import { TableRowHoverInterface } from "../index";

export function useRowHoverEvent(
  tableRef: TableRef,
  setHovered: ((data: TableRowHoverInterface | null) => void) | undefined,
) {
  const handleHover = React.useCallback(
    (row: HTMLElement) => {
      if (!setHovered) return;

      const debouncedSetHovered = debounce(setHovered, 20);

      const dispose = registerHover(
        row,
        () => debouncedSetHovered({ element: row, id: row.getAttribute("data-row-key")! }),
        () => {
          setHovered(null);
          debouncedSetHovered(null);
        },
      );

      return () => {
        dispose?.();
        setHovered(null);
      };
    },
    [setHovered],
  );

  useRow(tableRef, handleHover);
}

function registerHover(element: HTMLElement, onEnter: () => void, onLeave: () => void) {
  element.addEventListener("mouseenter", onEnter);
  element.addEventListener("mouseleave", onLeave);
  return () => {
    element.removeEventListener("mouseenter", onEnter);
    element.removeEventListener("mouseleave", onLeave);
  };
}
