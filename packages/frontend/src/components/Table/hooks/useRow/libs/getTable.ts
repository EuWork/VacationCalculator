import type { Reference } from "rc-table/lib/interface";
import { htmlCollectionToArray } from "@worksolutions/utils";

export function getTableBody(table: Reference) {
  return table.nativeElement.getElementsByClassName("ant-table-tbody")[0];
}

export function getTableRows(body: Element) {
  return htmlCollectionToArray(body.getElementsByClassName("ant-table-row"));
}
