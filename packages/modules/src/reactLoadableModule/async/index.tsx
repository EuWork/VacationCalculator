import { action, observable } from "mobx";
import { UUID } from "uuidjs";

import { AbstractModule } from "abstractModule";

export abstract class ReactLoadableModuleAsync<PROPS extends object> extends AbstractModule {
  constructor() {
    super(UUID.generate());
    this.mobx();
  }

  onPropsUpdated?(): void;

  @observable.shallow props: PROPS = {} as PROPS;
  @action _setProps(props: PROPS) {
    this.props = props;
  }
}
