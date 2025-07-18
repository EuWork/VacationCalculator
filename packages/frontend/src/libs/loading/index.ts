import { action, makeAutoObservable, observable } from "mobx";

export class Loading {
  constructor(initialLoading: boolean) {
    this.loading = initialLoading;
    makeAutoObservable(this);
  }

  @observable loading: boolean;
  @action enableLoading = () => void (this.loading = true);
  @action disableLoading = () => void (this.loading = false);
}
