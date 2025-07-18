import { Constructable } from "@app/kit";
import { observable, override, runInAction } from "mobx";
import { isFunction, isPureObject } from "@worksolutions/utils";

import { AbstractModule, multiDisposersCall } from "abstractModule";

import { LoadableModuleAsync } from "./async";

export type LoadModule<MODULE_ASYNC extends AbstractModule> =
  | (() => Promise<{ default: Constructable<MODULE_ASYNC> }>)
  | { Module: Constructable<MODULE_ASYNC> }
  | undefined;

export abstract class LoadableModule<MODULE_ASYNC extends LoadableModuleAsync> extends AbstractModule {
  __type = "loadable";

  constructor(
    name: string,
    private loadModule?: LoadModule<MODULE_ASYNC>,
  ) {
    super(name);
    this.mobx();
  }

  @observable loadedModule!: MODULE_ASYNC;

  async _moduleRendererOnBeforeInit() {
    const onBeforeInitResult = await super._moduleRendererOnBeforeInit();
    if (onBeforeInitResult === false) return false;

    if (isFunction(this.loadModule)) {
      const AsyncModuleConstructor = await this.loadModule().then((module) => module.default);
      runInAction(() => (this.loadedModule = new AsyncModuleConstructor()));
    } else if (isPureObject(this.loadModule)) {
      const ModuleConstructor = this.loadModule.Module;
      runInAction(() => (this.loadedModule = new ModuleConstructor()));
    }

    if (!this.loadedModule) return onBeforeInitResult;

    const loadedModuleOnBeforeInitResult = await this.loadedModule._moduleRendererOnBeforeInit?.();

    if (loadedModuleOnBeforeInitResult === false) {
      multiDisposersCall(onBeforeInitResult)();
      return false;
    }

    return multiDisposersCall(onBeforeInitResult, loadedModuleOnBeforeInitResult);
  }

  async _moduleRendererOnInit() {
    const onLoadedModuleInitResult = await this.loadedModule?._moduleRendererOnInit?.();
    if (onLoadedModuleInitResult === false) return false;

    const onInitResult = await super._moduleRendererOnInit();
    if (onInitResult === false) {
      multiDisposersCall(onLoadedModuleInitResult)();
      return false;
    }

    return multiDisposersCall(onLoadedModuleInitResult, onInitResult);
  }

  @override get _moduleRendererComponent() {
    return this.loadedModule?._moduleRendererComponent;
  }
}

export { LoadableModuleAsync };
