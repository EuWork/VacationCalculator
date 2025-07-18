import { registry, Registry } from "_internal/registry";

export { manualInstantiateAbstractModule } from "./_internal/abstractModuleRenderer";
export { setDefaultErrorComponent } from "./_internal/errorBoundary";
export * from "./abstractModule";
export * from "./loadableModule";
export * from "./moduleRenderer";
export * from "./modulesListLikePromiseAll";
export * from "./reactLoadableModule";
export * from "./types";

export function dangerousGetRegistry() {
  return registry;
}

export { Registry };
