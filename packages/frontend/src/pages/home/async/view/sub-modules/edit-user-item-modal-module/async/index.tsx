import React from "react";
import { ReactLoadableModuleAsync } from "@app/front-modules";

import EditUserItemModalModule, { EditUserItemModalProps } from "./view";

export default class AsyncModule extends ReactLoadableModuleAsync<EditUserItemModalProps> {
  constructor() {
    super();
    this.mobx();
  }

  render() {
    return <EditUserItemModalModule {...this.props} />;
  }
}
