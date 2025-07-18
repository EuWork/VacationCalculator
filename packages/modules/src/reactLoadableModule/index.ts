import { UUID } from "uuidjs";

import { LoadableModule, LoadModule } from "loadableModule";

import { ReactLoadableModuleAsync } from "./async";

export abstract class ReactLoadableModule<
  MODULE_ASYNC extends ReactLoadableModuleAsync<object>,
> extends LoadableModule<MODULE_ASYNC> {
  __type = "react";

  protected constructor(loadModule: LoadModule<MODULE_ASYNC>) {
    super(UUID.generate(), loadModule);
    this.mobx();
  }
}

export { ReactLoadableModuleAsync };
