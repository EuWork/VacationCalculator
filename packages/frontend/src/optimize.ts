import "reflect-metadata";
import {
  removeMobXArrayLengthWarnings,
  removeResizeObserverLoopLimitExceeded,
  removeReactFindDomNode,
  removeReactRenderUpdateWarning,
  removeAntWarning,
} from "@app/kit";

removeMobXArrayLengthWarnings();
removeResizeObserverLoopLimitExceeded();
removeReactFindDomNode();
removeReactRenderUpdateWarning();
removeAntWarning();
