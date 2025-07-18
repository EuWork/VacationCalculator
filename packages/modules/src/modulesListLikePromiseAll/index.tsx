import React, { Fragment } from "react";
import { UUID } from "uuidjs";
import { identity } from "@worksolutions/utils";

import { AbstractModule, multiDisposersCallArray } from "abstractModule";

import { HookFunctionResultDispose } from "../types";

export class ModulesListLikePromiseAll extends AbstractModule {
  constructor(private childModules: AbstractModule[]) {
    super(UUID.generate());
  }

  async onBeforeInit() {
    const disposers = await Promise.all(this.childModules.map((module) => module._moduleRendererOnBeforeInit()));
    const filteredDisposers = disposers.filter(identity) as HookFunctionResultDispose[];
    return multiDisposersCallArray(filteredDisposers);
  }

  async onInit() {
    const disposers = await Promise.all(this.childModules.map((module) => module._moduleRendererOnInit()));
    const filteredDisposers = disposers.filter(identity) as HookFunctionResultDispose[];
    return multiDisposersCallArray(filteredDisposers);
  }

  render() {
    return (
      <>
        {this.childModules.map((module) => {
          if (!module._moduleRendererComponent) return null;
          return <Fragment key={module.name}>{React.createElement(module._moduleRendererComponent)}</Fragment>;
        })}
      </>
    );
  }
}
