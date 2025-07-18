import React from "react";
import { Constructable } from "@app/kit";
import { observer } from "mobx-react-lite";

import { HookFunctionResult } from "types";
import { ErrorComponentType } from "_internal/errorBoundary";
import { AbstractModule } from "abstractModule";
import { LoadableModule } from "loadableModule";
import { ReactLoadableModule, ReactLoadableModuleAsync } from "reactLoadableModule";

import RenderReactLoadableModule, { BaseModule as RenderReactBaseModule } from "./render-react";
import RenderLoadableModule from "./render-loadable-or-abstract";

type BaseModule = ReactLoadableModule<ReactLoadableModuleAsync<{}>> | LoadableModule<AbstractModule> | AbstractModule;

type RenderModuleInterface<MODULE extends BaseModule> = {
  Module: Constructable<MODULE>;
  ErrorComponent?: ErrorComponentType | undefined;
  loadingElement?: React.ReactNode;
  onCustomBeforeInit?: (module: MODULE) => HookFunctionResult;
  onCustomInit?: (module: MODULE) => HookFunctionResult;
} & (MODULE extends ReactLoadableModule<ReactLoadableModuleAsync<infer PROPS>> ? PROPS : {});

function RenderModuleComponent<MODULE extends BaseModule>({ Module, ...props }: RenderModuleInterface<MODULE>) {
  const module = React.useMemo(() => new Module(), [Module]);
  if (module.__type === "react")
    return <RenderReactLoadableModule module={module as RenderReactBaseModule<any>} {...props} />;
  if (module.__type === "loadable") return <RenderLoadableModule module={module} {...props} />;
  if (module.__type === "abstract") return <RenderLoadableModule module={module} {...props} />;
}

export const RenderModule = observer(RenderModuleComponent);
