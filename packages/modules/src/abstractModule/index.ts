import type React from "react";
import { computed } from "mobx";
import { observer } from "mobx-react-lite";
import { BaseEntity, Constructable } from "@app/kit";

import { RegistryModuleOrAsyncModuleLoader, registry } from "_internal/registry";

import { HookFunctionResult, HookFunctionResultDispose } from "../types";

export abstract class AbstractModule extends BaseEntity {
  __type = "abstract";

  constructor(public readonly name: string) {
    super();
    this.mobx();
  }

  getModuleOrLoad<MODULE = unknown>(name: string, timeout?: number) {
    return registry.getModuleOrLoad<MODULE>(name, timeout);
  }

  getModuleSyncOrFail<MODULE = unknown>(name: string) {
    return registry.getModuleSyncOrFail<MODULE>(name);
  }

  getModuleSync<MODULE = unknown>(name: string) {
    return registry.getModuleSync<MODULE>(name);
  }

  setModule<MODULE = unknown>(name: string, moduleOrLoader: RegistryModuleOrAsyncModuleLoader<MODULE>) {
    return registry.setModule<MODULE>(name, moduleOrLoader);
  }

  loadExternalModule<MODULE>(name: string, moduleOrLoader: RegistryModuleOrAsyncModuleLoader<MODULE>) {
    return registry.loadExternalModule<MODULE>(name, moduleOrLoader);
  }

  loadUExternalModule<MODULE>(moduleOrLoader: RegistryModuleOrAsyncModuleLoader<MODULE>) {
    return registry.loadUExternalModule<MODULE>(moduleOrLoader);
  }

  loadExternalModuleInstance<MODULE extends Constructable<any>>(
    name: string,
    moduleOrLoader: RegistryModuleOrAsyncModuleLoader<MODULE>,
  ) {
    return registry.loadExternalModuleInstance<MODULE>(name, moduleOrLoader);
  }

  loadUExternalModuleInstance<MODULE extends Constructable<any>>(
    moduleOrLoader: RegistryModuleOrAsyncModuleLoader<MODULE>,
  ) {
    return registry.loadUExternalModuleInstance<MODULE>(moduleOrLoader);
  }

  onBeforeInit?(): HookFunctionResult;
  onInit?(): HookFunctionResult;
  render?(): React.ReactNode;

  async _moduleRendererOnBeforeInit() {
    return this.onBeforeInit?.();
  }

  async _moduleRendererOnInit() {
    const onInitResult = await this.onInit?.();
    if (onInitResult === false) return onInitResult;
    const disposeModuleRegistry = registry.setModule(this.name, { data: this });
    return multiDisposersCall(disposeModuleRegistry, onInitResult);
  }

  @computed get _moduleRendererComponent() {
    const Render = this.render;
    if (!Render) return undefined;
    return observer(Render.bind(this));
  }
}

export function multiDisposersCall(...disposers: (HookFunctionResultDispose | undefined | void)[]) {
  return () => disposers.forEach((disposer) => disposer?.());
}

export function multiDisposersCallArray(disposers: (HookFunctionResultDispose | undefined | void)[]) {
  return () => disposers.forEach((disposer) => disposer?.());
}
