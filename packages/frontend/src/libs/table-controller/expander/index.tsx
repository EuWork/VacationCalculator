import { BaseEntity } from "@app/kit";
import { observable } from "mobx";

export class Expander extends BaseEntity {
  constructor() {
    super();
    this.mobx();
  }

  @observable expandable = false;
  setExpandable = this.createSetter<boolean>("expandable");

  @observable.shallow expandedIds: string[] = [];
  setExpandedIds = this.createSetter<string[]>("expandedIds");

  onExpandedIdsChange = (callback: () => void) => this.onFieldChange(callback, "expandedIds", 0);
}
