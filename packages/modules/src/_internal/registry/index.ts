import { isFunction, waitFor } from "@worksolutions/utils";
import { Constructable } from "@app/kit";
import { UUID } from "uuidjs";

export type RegistryAsyncModuleLoader<VALUE> = () => Promise<{ default: VALUE }>;
export type RegistryModuleOrAsyncModuleLoader<VALUE> = RegistryAsyncModuleLoader<VALUE> | { data: VALUE };

export class Registry {
  private moduleRegistry = new Map<
    string,
    { loader: RegistryAsyncModuleLoader<any> | undefined; data: unknown | undefined }
  >();

  private async loadModule(name: string) {
    const module = this.moduleRegistry.get(name)!;
    if (!module.loader) return;
    const loadingResult = await module.loader();
    module.data = loadingResult.default;
  }

  async getModuleOrLoad<MODULE = unknown>(name: string, timeoutMS = 100_000) {
    try {
      await waitFor(() => this.moduleRegistry.has(name), { timeoutMS });
    } catch (e) {
      throw new Error(`Module ${name} is not registered`);
    }

    const module = this.moduleRegistry.get(name)!;
    if (module.data) return module.data as MODULE;

    await this.loadModule(name);
    return module.data as MODULE;
  }

  getModuleSync<MODULE = unknown>(name: string) {
    const module = this.moduleRegistry.get(name);
    if (!module) return null;
    if (module.data !== undefined) return module.data as MODULE;
    return null;
  }

  getModuleSyncOrFail<MODULE = unknown>(name: string) {
    const module = this.getModuleSync<MODULE>(name);
    if (!module) throw new Error(`Module ${name} is not registered`);
    return module;
  }

  setModule<MODULE>(name: string, moduleOrLoader: RegistryModuleOrAsyncModuleLoader<MODULE>) {
    if (this.moduleRegistry.has(name)) return;

    if (isFunction(moduleOrLoader)) {
      this.moduleRegistry.set(name, { loader: moduleOrLoader, data: undefined });
    } else {
      this.moduleRegistry.set(name, { loader: undefined, data: moduleOrLoader.data });
    }

    return () => this.moduleRegistry.delete(name);
  }

  async loadExternalModule<MODULE = unknown>(name: string, moduleOrLoader: RegistryModuleOrAsyncModuleLoader<MODULE>) {
    const dispose = this.setModule(name, moduleOrLoader);
    const module = await this.getModuleOrLoad<MODULE>(name);
    return { module, dispose };
  }

  async loadUExternalModule<MODULE>(moduleOrLoader: RegistryModuleOrAsyncModuleLoader<MODULE>) {
    const name = UUID.generate();
    const module = await this.loadExternalModule<MODULE>(name, moduleOrLoader);
    return { ...module, name };
  }

  loadExternalModuleInstance<MODULE extends Constructable<any>>(
    name: string,
    moduleOrLoader: RegistryModuleOrAsyncModuleLoader<MODULE>,
  ) {
    if (isFunction(moduleOrLoader)) {
      const loader = () => moduleOrLoader().then((module) => ({ default: new module.default() }));
      return this.loadExternalModule<InstanceType<MODULE>>(name, loader);
    } else {
      return this.loadExternalModule<InstanceType<MODULE>>(name, { data: new moduleOrLoader.data() });
    }
  }

  async loadUExternalModuleInstance<MODULE extends Constructable<any>>(
    moduleOrLoader: RegistryModuleOrAsyncModuleLoader<MODULE>,
  ) {
    const name = UUID.generate();
    const module = await this.loadExternalModuleInstance(name, moduleOrLoader);
    return { ...module, name };
  }
}

export const registry = new Registry();
