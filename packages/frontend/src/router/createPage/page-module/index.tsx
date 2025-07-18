import React from "react";
import { AbstractModule, ReactLoadableModule, ReactLoadableModuleAsync } from "@app/front-modules";
import { Constructable, runInPromiseQueue } from "@app/kit";
import { isFunction, promiseQueue } from "@worksolutions/utils";

import { Loading } from "libs";

import FullSizeLoader from "components/FullSizeLoader";

import Outer from "./outer";
import Inner from "./inner";

export type PageLoader = () => Promise<{ default: Constructable<AbstractModule> }> | Constructable<AbstractModule>;
export type PageOptions = { showMenu?: boolean };

class AsyncModule extends ReactLoadableModuleAsync<PageOptions & { loadModule: PageLoader }> {
  constructor() {
    super();
    this.mobx();
  }

  private loading = new Loading(true);

  private loadedModule: Constructable<AbstractModule> | undefined;

  private get showMenu() {
    return this.props.showMenu ?? true;
  }

  private async loadModule() {
    const loadResult = this.props.loadModule();
    if (isFunction(loadResult)) {
      this.loadedModule = loadResult;
      return true;
    }

    try {
      this.loadedModule = (await loadResult).default;
      return true;
    } catch (e) {
      return false;
    }
  }

  private _onPropsUpdatedQueue = promiseQueue(1);
  @runInPromiseQueue("_onPropsUpdatedQueue")
  async onPropsUpdated() {
    this.loading.enableLoading();

    const loadModuleSuccess = await this.loadModule();
    this.loading.disableLoading();
  }

  render() {
    return (
      <Outer showMenu={this.showMenu}>
        {this.loading.loading ? <FullSizeLoader /> : <Inner Page={this.loadedModule} />}
      </Outer>
    );
  }
}

export class PageModule extends ReactLoadableModule<AsyncModule> {
  constructor() {
    super({ Module: AsyncModule });
  }
}
