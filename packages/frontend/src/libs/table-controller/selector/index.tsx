import { BaseEntity } from "@app/kit";
import { observable } from "mobx";

export class Selector extends BaseEntity {
  constructor() {
    super();
    this.mobx();
  }

  @observable.shallow selectableIds: string[] = [];
  setSelectableIds = this.createSetter<string[]>("selectableIds");

  @observable.shallow selectedIds: string[] = [];
  setSelectedIds = this.createSetter<string[]>("selectedIds");

  onSelectedIdsChange = (callback: () => void) => this.onFieldChange(callback, "selectedIds", 0);
}
