import React from "react";
import { IntlDate } from "@worksolutions/utils";

export interface TableContextInterface {
  intlDate: IntlDate;
}

export const TableContext = React.createContext<TableContextInterface>(null!);

export function TableContextProvider({ intlDate, children }: { intlDate: IntlDate; children: React.ReactNode }) {
  return <TableContext.Provider value={{ intlDate }}>{children}</TableContext.Provider>;
}

export function useTableContext() {
  return React.useContext(TableContext);
}
