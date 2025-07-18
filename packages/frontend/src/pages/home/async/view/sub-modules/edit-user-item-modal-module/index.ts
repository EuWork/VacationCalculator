import { ReactLoadableModule } from "@app/front-modules";

import type AsyncModule from "./async";

export default class EditUserItemModalModule extends ReactLoadableModule<AsyncModule> {
  constructor() {
    super(() => import("./async"));
  }
}
