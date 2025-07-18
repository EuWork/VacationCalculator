import { UUID } from "uuidjs";

import { AbstractModule } from "abstractModule";

export abstract class LoadableModuleAsync extends AbstractModule {
  constructor() {
    super(UUID.generate());
  }
}
