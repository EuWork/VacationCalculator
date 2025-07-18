import debounce from "lodash.debounce";
import { action } from "mobx";
import { multiDisposersCall } from "@app/front-modules";
import { DisposableCall } from "@app/kit";

export function mobxShallowToDeepSubscribe(
  callback: () => void,
  subscribeShallow: (callback: () => void) => () => void,
  subscribeDeep: (callback: () => void) => () => void,
) {
  const debouncedCallback = debounce(callback, 5);
  const runDeepSubscription = action(subscribeDeep);
  const subscribeDeepDispose = new DisposableCall();
  const disposeSubscribeShallow = subscribeShallow(() => {
    debouncedCallback();
    subscribeDeepDispose.dispose();
    subscribeDeepDispose.setDispose(runDeepSubscription(debouncedCallback));
  });

  return multiDisposersCall(disposeSubscribeShallow, subscribeDeepDispose.dispose);
}
