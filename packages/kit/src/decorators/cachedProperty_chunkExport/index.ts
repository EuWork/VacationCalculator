import ms from "ms";

import { msValue } from "types";

type TTL = msValue | -1;

type Options = { keyFunction?: (...args: any[]) => string; enabled?: () => boolean };

export function cachedProperty(ttl: TTL, options?: Options): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    const originalFunction = descriptor.value! as any;
    descriptor.value = createCachedFunction(originalFunction, ttl, options);
  };
}

const defaultKeyFunction = JSON.stringify;
const defaultEnabled = () => true;

export function createCachedFunction<FUNC extends Function>(
  originalFunction: FUNC,
  ttl: TTL,
  { keyFunction = defaultKeyFunction, enabled = defaultEnabled }: Options = {},
) {
  const time = ttl === -1 ? Infinity : ms(ttl);
  const cache = new Map<any, { createdAt: number; value: any }>();
  return function (this: any, ...args: any[]) {
    if (!enabled()) return originalFunction.apply(this, args);
    const key = keyFunction(...args);
    const cacheElement = cache.get(key);
    const now = Date.now();
    if (cacheElement && now - cacheElement.createdAt < time) return cacheElement.value;

    const newValue = originalFunction.apply(this, args);
    cache.set(key, { value: newValue, createdAt: now });
    return newValue;
  } as any as FUNC;
}
